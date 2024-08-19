---
layout: ../../layouts/LayoutBlogPost.astro
title: "Creating a Translation Service"
description: "this is a post example"
pubDate: 2020-01-10
category: "intro"
---

This document describes how to create a translation service using AWS Services

## Create an AWS Account

Go to https://aws.amazon.com/free/

Fill out the following form with your information
<img width="448" alt="Screen Shot 2020-01-12 at 9 28 04 PM" src="https://user-images.githubusercontent.com/14353143/72233182-ec9db300-3582-11ea-9260-3355118772f6.png">



## Part 1: Create an AWS Lambda

<img width="1153" alt="Screen Shot 2020-01-12 at 9 42 42 PM" src="https://user-images.githubusercontent.com/14353143/72234298-849e9b00-3589-11ea-8426-d450cd286756.png">

```python
import json
import boto3

def lambda_handler(event, context):
    # This creates the translation service client
    # This lambda has permission to call this service because we allowed it in IAM
    client = boto3.client(service_name='translate', region_name='us-west-2', use_ssl=True)

    # We call the client with the text we want translated 
    # Pass the source and target language
    # https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is-languages
    response = client.translate_text(
        Text= "Hello",
        SourceLanguageCode='en',
        TargetLanguageCode='es'
        )
    
    print(json.dumps(response))

    # Return the translated text in the response
    return {
        'statusCode': 200,
        'body': json.dumps(response["TranslatedText"])
    }
```

## Part 2: Add Permissions for Lambda to Call Translation Service

<img width="746" alt="Screen Shot 2020-01-12 at 9 43 25 PM" src="https://user-images.githubusercontent.com/14353143/72234299-85373180-3589-11ea-849e-88c61acce18b.png">

<img width="674" alt="Screen Shot 2020-01-12 at 9 44 38 PM" src="https://user-images.githubusercontent.com/14353143/72234300-85373180-3589-11ea-94e2-1a1c2a052371.png">

<img width="275" alt="Screen Shot 2020-01-12 at 9 45 11 PM" src="https://user-images.githubusercontent.com/14353143/72234301-85373180-3589-11ea-835d-8a3555fc03e1.png">

## Part 3: Create an API

<img width="1019" alt="Screen Shot 2020-01-12 at 10 30 45 PM" src="https://user-images.githubusercontent.com/14353143/72234644-39858780-358b-11ea-9606-8131f976af32.png">

<img width="795" alt="Screen Shot 2020-01-12 at 10 05 26 PM" src="https://user-images.githubusercontent.com/14353143/72234304-85373180-3589-11ea-8761-0edd42129f65.png">

## Part 5: Get Input from API

```python
import json
import boto3

def lambda_handler(event, context):
    # This creates the translation service client
    # This lambda has permission to call this service because we allowed it in IAM
    client = boto3.client(service_name='translate', region_name='us-west-2', use_ssl=True)

    # We call the client with the text we want translated 
    # Pass the source and target language
    # https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is-languages
    response = client.translate_text(
        Text= event["queryStringParameters"]["q"],
        SourceLanguageCode='en',
        TargetLanguageCode='es'
        )

    # Return the translated text in the response
    return {
        'statusCode': 200,
        'body': json.dumps(response["TranslatedText"])
    }
```

## Test It!

https://YOUR_API.execute-api.us-west-2.amazonaws.com/?q=library