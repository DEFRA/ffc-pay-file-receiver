# FFC Pay File Receiver

## Description

Microservice to transfer, return and acknowledge files from a Dynamics 365 (DAX) Azure File Share to an Azure Blob Storage location.

This service is part of the [Strategic Payment Service](https://github.com/DEFRA/ffc-pay-core).

## Prerequisites
### Software required
- [Azure Service Bus](https://docs.microsoft.com/en-us/azure/service-bus-messaging/)
- [Docker](https://www.docker.com/)
- Either:
  - [Docker Compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually)
  - [Docker-Compose (standalone)](https://docs.docker.com/compose/install/other/)

Optional:
- [Kubernetes](https://kubernetes.io/)
- [Helm](https://helm.sh/)

### Configuration
#### Azure Service Bus

This service depends on a valid Azure Service Bus connection string for
asynchronous communication.  The following environment variables need to be set
in any non-production (`!config.isProd`) environment before the Docker
container is started or tests are run. 

When deployed into an appropriately configured AKS
cluster (where [AAD Pod Identity](https://github.com/Azure/aad-pod-identity) is
configured) the microservice will use AAD Pod Identity.

| Name | Description |
| ---| --- |
| MESSAGE_QUEUE_HOST | Azure Service Bus hostname, e.g. `myservicebus.servicebus.windows.net` |
| MESSAGE_QUEUE_PASSWORD | Azure Service Bus SAS policy key |
| MESSAGE_QUEUE_USER | Azure Service Bus SAS policy name, e.g. `RootManageSharedAccessKey`    |
| MESSAGE_QUEUE_SUFFIX | Developer initials |
| AZURE_STORAGE_SHARE_ACCOUNT_NAME | Account name for Azure share-folder |
| AZURE_STORAGE_SHARE_ACCOUNT_KEY | Account key for Azure share-folder |

##### Message schemas

All message schemas are fully documented in an [AsyncAPI specification](docs/asyncapi.yaml).


## Setup
### Docker

Docker Compose can be used to build the container image.  

```
docker-compose build
```

The service will file watch application and test files so no need to rebuild the container unless a change to an npm package is made.

## How to start the service

The service can be run using the [start](./scripts/start) script.

```
./scripts/start
```

This script accepts any Docker Compose [Up](https://docs.docker.com/engine/reference/commandline/compose_up/) argument.


## How to stop the service

The service can be stopped using the [stop](./scripts/stop) script.

```
./scripts/stop
```

The script accepts any Docker Compose [Down](https://docs.docker.com/engine/reference/commandline/compose_down/) argument.

For example, to stop the service and clear all data volumes.

```
./scripts/stop -v
```

## How to test the service

The service can be tested using the [test](./scripts/test) script.

```
./scripts/test
```

The script accepts the following arguments:

- `--watch/-w` - run tests with file watching to support Test Driven Development scenarios (TDD)
- `--debug/-d` - run tests in debug mode.  Same as watch mode but will wait for a debugger to be attached before running tests.

## CI pipeline

This service uses the [FFC CI pipeline](https://github.com/DEFRA/ffc-jenkins-pipeline-library)

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable information providers in the public sector to license the use and re-use of their information under a common open licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
