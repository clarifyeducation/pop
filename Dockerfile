FROM python:2.7
RUN apt-get update \
 && apt-get install -y gettext-base
ENV PYTHONUNBUFFERED 1
RUN pip install s3cmd
RUN mkdir /app
WORKDIR /app
COPY . /app/
