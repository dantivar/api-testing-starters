FROM postgres:9.3
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_DB go_restful
ADD init.sql /docker-entrypoint-initdb.d/
