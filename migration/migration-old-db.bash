#!/bin/bash
# -*- coding: UTF8 -*-

# To export postgresql data, first ./migration-old-db.sql
# Then convert csv to json like tool thanks https://csvjson.com/

# To use this script USE AN EXISTING __User id . Replace XXXXX by a __User id

# See also
# https://docs.parseplatform.org/js/guide/#importing-data
# https://blog.back4app.com/parse-json-files/
# https://www.back4app.com/docs/parse-dashboard/core/import-csv

file='./batiment.json'

sed -i '/"id": /d' "${file}"
sed -i '/": ""/d' "${file}"
sed -i 's/": "t"/": true/' "${file}"
sed -i 's/": "f"/": false/' "${file}"
sed -i 's/"constructionDebut": "\([0-9-]\+\)"/"constructionDebut": { "__type": "Date", "iso": "\1" }/' "${file}"
sed -i 's/"constructionFin": "\([0-9-]\+\)"/"constructionFin": { "__type": "Date", "iso": "\1" }/' "${file}"
sed -i 's/"usageBatiment": "\([A-z0-9_]\+\)"/"usageBatiment": { "__type": "Pointer", "className": "UsageBatiment", "objectId": "\1" }/' "${file}"
sed -i 's/"bottesTaille": "\([A-z0-9_]\+\)"/"bottesTaille": { "__type": "Pointer", "className": "TaillesBottes", "objectId": "\1" }/' "${file}"
sed -i 's/"bottesCereale": "\([A-z0-9_]\+\)"/"bottesCereale": { "__type": "Pointer", "className": "Cereale", "objectId": "\1" }/' "${file}"
sed -i 's/"autoconstruction": "\([A-z0-9_]\+\)"/"autoconstruction": { "__type": "Pointer", "className": "YesNoPartial", "objectId": "\1" }/' "${file}"
sed -i 's/"participatif": "\([A-z0-9_]\+\)"/"participatif": { "__type": "Pointer", "className": "YesNoPartial", "objectId": "\1" }/' "${file}"
sed -i 's/"structComplNature": "\([A-z0-9_]\+\)"/"structComplNature": { "__type": "Pointer", "className": "StructureComplementaire", "objectId": "\1" }/' "${file}"
sed -i 's/"integBaie": "\([A-z0-9_]\+\)"/"integBaie": { "__type": "Pointer", "className": "IntegBaie", "objectId": "\1" }/' "${file}"
sed -i 's/"supportAncrage": "\([A-z0-9_]\+\)"/"supportAncrage": { "__type": "Pointer", "className": "SupportAncrage", "objectId": "\1" }/' "${file}"
sed -i 's/"revetInt": "\([A-z0-9_]\+\)"/"revetInt": { "__type": "Pointer", "className": "RevetementInterieur", "objectId": "\1" }/' "${file}"
sed -i 's/"revetExt": "\([A-z0-9_]\+\)"/"revetExt": { "__type": "Pointer", "className": "RevetementExterieur", "objectId": "\1" }/' "${file}"

sed -i 's/‎//' "${file}"
sed -i 's/"codePostal": \([0-9]\+\)/"codePostal": "\1"/' "${file}"

sed -i 's/^  {$/  {\n    "owner": { "__type": "Pointer", "className": "_User", "objectId": "XXXXXXXX" },/' "${file}"

# could be replaced by "vim" if nvim is not installed
nvim -u NONE -c '%s/,\n  }/\r  }/ | x' "${file}"
