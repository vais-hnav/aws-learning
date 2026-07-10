# Lambda Performance, Layers, And Configuration Lab

Use this folder to practice the Phase 8A Lambda topics after the first function works.

This lab covers playlist videos:
- 62. Lambda cost and memory performance
- 67. Lambda cold start
- 68. Lambda layers
- 69. Sensitive/configuration data in Lambda

## What Did I Build?

A small follow-up lab for:
- Updating Lambda memory.
- Observing cold-start and warm-start behavior.
- Publishing a simple Python Lambda layer.
- Attaching that layer to a function.
- Reading non-sensitive config from environment variables.
- Understanding where real secrets should live.

## Which AWS Service Did I Use?

- AWS Lambda
- CloudWatch Logs
- IAM
- AWS Secrets Manager or SSM Parameter Store as a future-safe pattern

## What Did I Learn?

- Lambda memory affects both cost and performance.
- Cold starts are normal, but they matter more for APIs than background jobs.
- Layers are useful for shared code and dependencies.
- A large layer can still hurt startup time, so layers are not magic.
- Environment variables are configuration, not a place to casually store real secrets.
- If Lambda reads secrets, its execution role needs specific permissions.
- Secrets Manager stores sensitive values outside code and lets Lambda fetch them at runtime using IAM.

## How Do I Run It?

Use:
- `commands.md` for the CLI flow.
- `lambda_with_layer.py` as a sample function that imports from a layer.
- `layer-example/python/aws_learning_utils.py` as the sample layer code.
- `config_reader_example.py` as a safe configuration/secrets access pattern.
- `secrets-manager-notes.md` for short video 69 notes about Secrets Manager.

Recommended safe order:
1. Finish the `basic-lambda-cloudwatch/` lab first.
2. Publish the sample layer.
3. Attach the layer to the existing test function.
4. Upload the layer-aware Lambda code.
5. Test and inspect logs.
6. Remove the layer and delete the layer version.

## How Do I Delete It?

Use `cleanup.md`.

At minimum:
- Remove the layer from the function.
- Delete the layer version.
- Delete local ZIP/build files.
- Delete the test function/log group if Phase 8A practice is finished.
