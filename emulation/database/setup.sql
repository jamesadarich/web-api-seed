CREATE DATABASE WebApiSeed;
GO

USE WebApiSeed;
GO

CREATE TABLE "User"
(    
    "Id" int NOT NULL IDENTITY(1,1),
    "GivenName" nvarchar(255) NOT NULL,
    "FamilyName" nvarchar(255) NOT NULL,
    "Username" nvarchar(255) NOT NULL,
    "PasswordHash" nvarchar(255) NOT NULL,
    "EmailAddress" nvarchar(255) NOT NULL,
    "Activated" bit NOT NULL,
    PRIMARY KEY("Id")
)
