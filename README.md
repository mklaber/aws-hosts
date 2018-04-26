# aws-hosts

Got an IT Admin who doesn't want to add dynamic DNS forwarding? Here's a quick way to convert an AWS compute.internal private IP address to a `/etc/hosts` entry.

## Usage

```bash
$ aws-hosts http://ip-172-20-1-23.eu-west-1.compute.internal:2344/logs/app_123234.txt
172.20.1.23 ip-172-20-1-23.eu-west-1.compute.internal
```

`aws-hosts --help` for details.

