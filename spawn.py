#!/usr/bin/env python3
from sys import argv
from subprocess import run


if len(argv) > 1:
    name = argv[0]
    print("Creatintg {name} constainer")
    run(f"sudo docker run -d --name {name} betbot".split())
    run(f"sudo docker cp . {name}:/app".split())
    run(f"sudo docker restart {name}".split())

else:
    print("Please specify the name of your container")
