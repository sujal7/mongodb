# Learning Materials

## MongoDB Ecosystem

![alt](/image/ecosystem.png)

## Understanding Databases, Collections, and Documents

![alt](/image/intro.png)

## CRUD Operations

![alt](/image/crud.png)

## Understanding find() and cursor object

![alt](image/cursorObject.png)

## Projection

![alt](/image/projection.png)

## Moodule Summary

![alt](image/moduleSummary1.png)

## Oficial Getting Started Docs: [Link](https://docs.mongodb.com/manual/tutorial/getting-started/)

## Learn About MongoDB Drivers: [Link](https://docs.mongodb.com/drivers/)

## To Schema or Not To Schema

![Schema](image/schemaornot.png)

## Data Types

![Data Types](image/dataTypes.png)

## Data Types in MongoDB: [Link](https://docs.mongodb.com/manual/reference/bson-types/)

## Data Schemas and Data Modelling

![alt](image/dataSchemas.png)

## Relations - Options

![alt](image/relations.png)

![alt](image/relations2.png)

### One to One Relations - Embedded

![alt](image/oneToOne.png)

### One to One Relations - Using References

![alt](image/oneToOneReferences.png)

### One to Many Relations - Embedded

![alt](image/oneToMany.png)

### One to Many Relations - References

![alt](image/onetoManyReferences.png)

### Many to Many - Embedded

- Do we really need to change the data of ordered products if the data of product changes over time? If so, then embedded approach might be ideal.

![alt](image/manyToManyEmbedded.png)

### Many to Many - References

- Do we need to change the data of book if the data of author changes over time? If so, then references approach might be ideal.
- Also reduces data duplication.

![alt](image/manyToManyReferences.png)

### Using lookUp() for merging reference relations

![alt](image/lookUp.png)

## Example Project : A Blog

![alt](image/exampleProject.png)

## Example Project Solution of Database Structure

![alt](image/exampleProjectStructure.PNG)

## Schema Validation

![alt](image/schemaValidation.png)

## Schema Validation Example

![alt](image/schemaValidationExample.png)

## Data Modelling & Structuring - Things to Consider

![alt](image/thingsToConsider.png)

## Module Summary

![alt](image/moduleSummary2.png)

## More on Schema Validation: [Link](https://docs.mongodb.com/manual/core/schema-validation/)

## Diving Deep into CREATE Operations

### Understanding writeConcern

![alt](image/writeConcern.png)

### Atomicity

![alt](image/atomicity.png)

### Module Summary

![alt](image/moduleSummary3.png)

Helpful Articles/ Docs:

insertOne(): https://docs.mongodb.com/manual/reference/method/db.collection.insertOne/

insertMany(): https://docs.mongodb.com/manual/reference/method/db.collection.insertMany/

Atomicity: https://docs.mongodb.com/manual/core/write-operations-atomicity/#atomicity

Write Concern: https://docs.mongodb.com/manual/reference/write-concern/

Using mongoimport: https://docs.mongodb.com/manual/reference/program/mongoimport/index.html

## Diving Deep into READ Operations

### How Operators impact our Data?

![alt](image/operators.png)

![alt](image/operators2.png)

### Understanding Cursors

![alt](image/cursors.png)

Helpful Articles/ Docs:

More on find(): https://docs.mongodb.com/manual/reference/method/db.collection.find/

More on Cursors: https://docs.mongodb.com/manual/tutorial/iterate-a-cursor/

Query Operator Reference: https://docs.mongodb.com/manual/reference/operator/query/
