# clear the root models folder (only for this project, normally we won't do this)
rm ../../database/models/*
rm dump/*

../../node_modules/.bin/sequelize-auto sequelize-auto -o dump -d droopie -h localhost -p 5432 -u postgres -x postgres -e postgres -s hris --cm p --cp c --sg -l ts
cp -R dump/* ../../database/models/

echo "*****************"
echo "List of files in Dump"
ls dump
echo "*****************"

echo "Total files in Dump"
ls dump | wc -l
echo "*****************"
