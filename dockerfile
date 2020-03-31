FROM microsoft/mssql-server-linux:latest

ENV ACCEPT_EULA=Y

# update password
ENV SA_PASSWORD=Stupidpassword123!

RUN mkdir -p /app/sql
WORKDIR /app/sql
COPY . .