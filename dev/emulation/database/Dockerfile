FROM microsoft/mssql-server-linux:latest

# Copy local files to container
RUN mkdir -p /usr/db/scripts/
WORKDIR /usr/db/scripts/
COPY . /usr/db/scripts/

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/db/scripts/import-data.sh

# Expose port
EXPOSE 1433

# Setup database and import data
CMD /bin/bash /usr/db/scripts/entrypoint.sh
