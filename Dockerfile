FROM nginx:latest

WORKDIR /app

COPY . /app

RUN apt update && apt install python3 python3-venv 

RUN python3 -m venv venv

RUN venv/bin/python3 -m pip install -r requitements.txt

RUN venv/bin/gunicorn -w 1 -b 0.0.0.0:5000 wsgi:app