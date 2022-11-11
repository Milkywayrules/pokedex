## Kinda notes

Data Access layer is for bridging the data from any "source" to components later.

```
Example:

- Data sent from server need to be fetched from client.
- We request specific API endpoint using Axios w/ specific method.
- Response from that API should be rendered to UI later. We first need to validate etc.
- That process shouldn't be in component itself, so later on we can test each of them separately.
- This is where Data Access module benificial, as a bridge between any "source" to any component.

For this Web App, it only consist of API module.

```
