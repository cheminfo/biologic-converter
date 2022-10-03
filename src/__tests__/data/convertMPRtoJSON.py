#!/usr/bin/env python
"""
Try isolated before ruining anything or read the code to 
double check it is correct.

This should read all the mpr files and parse them with 
electrochem (needs to be installed) to json.

Downside: it replaces some values with NaN, that should be handled later
"""
import glob
import json
import yadg.parsers.electrochem.eclabmpr as p


files = glob.glob("./*/*.mpr")
print(files)
for filename in files:
    if filename.endswith("ca.mpr"):
        newfilename = filename.split(".mpr")[0]+"-full.json"
        print(newfilename)
        data, meta, date  = p.process("./"+filename)
        totest = data
        fo = open(newfilename, "w")
        fo.write(json.dumps(totest))
        fo.close()
