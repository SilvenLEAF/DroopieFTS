import { QueryTypes } from 'sequelize';
import { Request, Response } from 'express';
import DBmodels from '../../database/DBmodels';
import { sequelize } from '../../database/DBmodels';
const { File } = DBmodels;



/* ----------------------------------
.       get all files (FTS)
---------------------------------- */
interface IQuery {
  limit: string, offset: string, sort: string, searchKey: string, keywords: string, mustHaveKeywords: string,
}
export const get_all_dropbox_files = async (req: Request, res: Response) => {
  try {
    const { limit, offset, sort, searchKey, keywords: rawKeywords, mustHaveKeywords: rawMustHaveKeywords }: any = req.query || {};

    const searchVal = (searchKey && typeof searchKey === 'string') ? `%${searchKey.toLowerCase()}%` : '';
    const keywords  = rawKeywords ? (Array.isArray(rawKeywords) ? rawKeywords : [rawKeywords]) : [];
    const mustHaveKeywords  = rawMustHaveKeywords ? (Array.isArray(rawMustHaveKeywords) ? rawMustHaveKeywords : [rawMustHaveKeywords]) : [];

    // pagination
    const limitNum = limit ? Number(limit) : 10;
    const offsetNum = offset ? Number(offset) : 0;

    //   query validation
    if (isNaN(limitNum)) return res.status(400).json({ error: true, message: 'The limit query parameter must be a number!' });
    if (isNaN(offsetNum)) return res.status(400).json({ error: true, message: 'The offset query parameter must be a number!' });
    if (limitNum < 0) return res.status(400).json({ error: true, message: 'Limit must be greater than 0!' });
    if (limitNum > 100) return res.status(400).json({ error: true, message: 'Limit must not exceed 100!' });
    if (offsetNum < 0) return res.status(400).json({ error: true, message: 'Offset must not be less than 0!' });


    // sort query
    let [sortBy, sortType] = sort ? sort.split(':') : ['file_name', 'ASC'];
    if (!sortType && sortBy !== 'dropbox_updated_at') sortType = 'ASC';
    if (!sortType && sortBy === 'dropbox_updated_at') sortType = 'DESC';

    const validSorts = ['file_name', 'dropbox_updated_at'];
    const isSortReqValid = validSorts.includes(sortBy);

    const validSortTypes = ['asc', 'desc'];
    const isSortTypeReqValid = validSortTypes.includes(sortType.toLowerCase());

    if (!sortBy || !isSortReqValid) return res.status(400).json({ error: true, message: 'Invalid sort query parameter!' });
    if (!isSortTypeReqValid) return res.status(400).json({ error: true, message: 'Invalid sort query parameter! Sort type is invalid, it should be either "asc" or "desc"!' });

    const ftsFilters: any = getFTSfilters({ keywords, mustHaveKeywords });
    if (ftsFilters.error) return res.status(400).json(ftsFilters);
    const { keywordStr, mustHaveKeywordStr } = ftsFilters || {};

    const replacements = {
      keywordStr, mustHaveKeywordStr,
      limitNum, offsetNum, searchVal,
      sortBy, sortType,
    }

    const allRawRecords = await sequelize.query(getSqlStmt({ filters: replacements }), {
      type: QueryTypes.SELECT,
      replacements,
    });
    const rawResultCount: any = await sequelize.query(getSqlStmt({ queryType: 'count', filters: replacements }), {
      type: QueryTypes.SELECT,
      replacements,
    });
    const paginatedResponse = {
      limit: limitNum, offset: offsetNum,
      count: rawResultCount[0].count, records: allRawRecords
    };
    return res.json(paginatedResponse);
  } catch (err: any) {
    console.log(err.message);
    console.log(err);
    return res.status(500).json({ error: true, message: err.message || 'Error occurred while processing!' });
  }
}

// helper functions
interface ISqlFuncArg {
  queryType?: string,
  filters: {
    keywordStr: string, mustHaveKeywordStr: string,
    searchVal?: string, sortBy: string, sortType: string,
  },
}

function getSqlStmt({ queryType, filters }: ISqlFuncArg) {
  const { keywordStr, mustHaveKeywordStr, searchVal, sortBy, sortType } = filters || {};
  const typeVal = queryType && queryType.toLowerCase().trim();

  let sqlStmt = (typeVal === 'count') ? 'SELECT count(*)' : `SELECT 
    fl.file_id, fl.dropbox_file_id, fl.file_name, fl.file_path, fl.url, fl.dropbox_updated_at, fl.visit_count
  `;
  sqlStmt += ` FROM hris.files fl WHERE TRUE`;
  // fts filters
  if (keywordStr) sqlStmt += ` AND fl.content_fts @@ to_tsquery(:keywordStr)`;
  if (mustHaveKeywordStr) sqlStmt += ` AND fl.content_fts @@ to_tsquery(:mustHaveKeywordStr)`;

  // search
  if (searchVal) sqlStmt += ` AND fl.file_name ILIKE :searchVal`;

  if (typeVal !== 'count') {
    sqlStmt += ` ORDER BY fl.${sortBy} ${sortType}`;
    sqlStmt += ` LIMIT :limitNum OFFSET :offsetNum`;
  }
  return sqlStmt
};

// fts helpers
const ftsSearchStr = (keyArr: string[]) => {
  // format keywords
  const keywordsArr: string[] = [];
  for (let item of keyArr) {
    const arr = item.split(' ');
    const tmpArr = [];
    for (let str of arr) {
      const rStr = str.toString().toLowerCase().trim().replace(/[&|]/g, '');
      if (rStr && !keywordsArr.includes(rStr)) {
        tmpArr.push(rStr);
      }
    }
    keywordsArr.push(tmpArr.join('<1>'));
  }
  return keywordsArr;
}

const getFTSfilters = ({ keywords, mustHaveKeywords }: {
  keywords: string[],
  mustHaveKeywords: string[],
}) => {
  try {
    const ftsObj: { keywordStr: string, mustHaveKeywordStr: string } = { keywordStr: '', mustHaveKeywordStr: '' };

    if (keywords) {
      const keywordsArr = keywords.length ? ftsSearchStr(keywords) : [];
      const keywordsStr = keywordsArr.length ? keywordsArr.join(' | ') : '';
      ftsObj.keywordStr = keywordsStr;
    }

    if (mustHaveKeywords) {
      const mhKeywordsArr = mustHaveKeywords.length ? ftsSearchStr(mustHaveKeywords) : [];
      const mhKeywordsStr = mhKeywordsArr.length ? mhKeywordsArr.join(' & ') : '';
      ftsObj.mustHaveKeywordStr = mhKeywordsStr;
    }
    return ftsObj;
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Something went wrong while formatting FTS filters!' };
  }
}

const lowerArray = (arr: string[]) => {
  try {
    if (arr && Array.isArray(arr)) return arr.map(item => item.toLowerCase().trim());
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}