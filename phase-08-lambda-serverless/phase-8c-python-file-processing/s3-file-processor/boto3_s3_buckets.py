import boto3

s3 = boto3.client("s3")

response = s3.list_buckets()
buckets = response.get("Buckets", [])

for bucket in buckets:
    name = bucket["Name"]
    location = s3.get_bucket_location(Bucket=name).get("LocationConstraint")

    if location is None:
        location = "us-east-1"

    print(name, location)

owner = response.get("Owner", {})
print("Owner display name:", owner.get("DisplayName", "Not provided"))
print("Owner ID:", owner.get("ID", "Not provided"))
print("Total buckets:", len(buckets))
