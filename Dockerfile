FROM nginx:latest

WORKDIR /app

COPY . /app
 
RUN apt update && apt upgrade -y

RUN apt install python3 python3-venv -y

RUN python3 -m venv /venv

RUN /venv/bin/python3 -m pip install -r requirements.txt

CMD /venv/bin/gunicorn -w 3 -b 0.0.0.0:80 wsgi:app