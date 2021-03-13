# web3-service-worker-cache

> A web3 service worker reducing your costly calls to Ethereum full nodes.

## Why use Service Workers?

Access to Ethereum full nodes is starting to cost money [1, 2, 3]. As Ethereum
developers wanting to build _decentralized_ and _autonomous_ applications,
continuously paying fiat to service providers isn't according to our
principles, however. Also, assuming a constant and stable connection for your
users may end up ruining their experience when using our app. Indeed, building
for offline-first usage, isn't a new concept.

Web2 has many concepts for improving user experiences by reducing reliance on
stable connections. One of these concepts is called [Service
Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

Service workers is a set of JavaScript that can run as a proxy between your
application and a service it's using. "They're intended to to enable the
creation of effective offline experiences" and to take appropriate actions for
when the network is flaky.

## What can web3-service-worker-cache do for you?

Service workers are capable of intercepting network calls. web3 is known for
excessively calling full nodes to stay in sync and make sure that a user signs
transactions based on up-to-date data. But lots of data that is delivered from
the full node via web3 to an application is indeed **immutable** and, hence,
nicely cachable.

Luckily, service workers are now a widely-implemented web standard available in
most browsers [4]. They should, hence, allow us to automatically cache lots of
web3 transactions without ever having to talk to a full node again. Looking at
[OpenEthereum's JSON RPC call
documentation](https://openethereum.github.io/JSONRPC), we can savely assume
that the following calls have potential for caching without revalidation as
their responses are
[`immutable`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control#revalidation_and_reloading):

- `eth_getBlockByHash`
- `eth_getBlockByNumber`
- `eth_getBlockTransactionCountByHash`
- `eth_getBlockTransactionCountByNumber` 
- `eth_getTransactionByBlockHashAndIndex`
- `eth_getTransactionByBlockNumberAndIndex`
- `eth_getTransactionByHash`
- `eth_getTransactionReceipt`

Additionally, there's calls have a potential for being cached for a specific
amount of time or assuming the future existence of an _invalidation event_ (as
e.g. the existence of a new transaction or block):

- `eth_estimateGas`
- `eth_getStorageAt`

## Debugging

### Mozilla Firefox

To see the messages a service worker is logging, in Firefox got to [this
page](about:debugging#/runtime/this-firefox), find your worker and click
"Inspect".

### Google Chrome

[Tutorial](https://deanhume.com/testing-service-workers-locally-with-self-signed-certificates/)
on how to use service workers in Google Chrome with self-signed certificates.

## Note on Completeness

- This project is a work in progress

## License

See [License](./LICENSE).

## References

- 1: https://infura.io/pricing
- 2: https://www.alchemyapi.io/pricing
- 3: https://www.quiknode.io/pricing
- 4: https://caniuse.com/serviceworkers
