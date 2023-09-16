#!/usr/bin/env python3
from sys import argv
from subprocess import run


if len(argv) > 1:
    name = argv[1]
    print(f"Creatintg {name} container")
    run(f"docker run -d --name {name} betbot".split())
    run(f"docker cp . {name}:/app".split())
    run(f"docker restart {name}".split())
    run(f"docker exec {name} export SERVER='172.17.0.1'")

else:
    print("Please specify the name of your container")
