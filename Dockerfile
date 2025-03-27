FROM python:3.13
RUN apt-get update \
 && apt-get install -y gettext-base
ENV PYTHONUNBUFFERED 1
RUN pip3 install s3cmd
RUN mkdir /app
WORKDIR /app
COPY . /app/
