#!/bin/bash
find $(pwd)/lib -type f -name '*.js' -o -name '*.js.map' -o -name '*.d.ts' ! -name 'global.d.ts' | xargs rm