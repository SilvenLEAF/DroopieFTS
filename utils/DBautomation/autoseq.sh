# Ques: What are we doing here?
# 1. Clear all existing models
# 2. Recreating all models
# 3. Moving to specified location (here copying)

# NOTE: We are removing and recreating all only for this project
# In real life, we will generate only specified model where changes were made
# How? Easily using the bash if statements and argument passing
# Then we will only move it (a.k.a update) onto the existing file 
# We won't delete anything

# But for this assessment, we are going with this :)


rm ../../database/models/*
rm dump/*

../../node_modules/.bin/sequelize-auto sequelize-auto -o dump -d droopie -h localhost -p 5432 -u postgres -x postgres -e postgres -s hris --cm p --cp c --sg -l ts
cp -R dump/* ../../database/models/


# above script will recreate those models into a dump folder that will be created in this current directory
echo "*****************"
echo "List of files in Dump"
ls dump
echo "*****************"

echo "Total files in Dump"
ls dump | wc -l
echo "*****************"
