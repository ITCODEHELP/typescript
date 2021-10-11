
![npm](https://img.shields.io/npm/v/@jupita/jupita-agent-sdk)

# Jupita Agent Typescript SDK

This library will allow you to make the required `dump` API calls with Jupita Agent. All API calls are made asynchronously, thus there are event listeners available to handle the API results.

## Overview
Jupita Agent is an API product that provides deep learning powered communications analytics. Within the SDK documentation, `messageType` will simply refer to who is speaking. `messageType` 0 = `agent`, and `messageType` 1 = `client`, although these labels are handled by the SDK.

The required parameters for the APIs include setting `messageType`, along with assigning an `agentId` + `clientId` to be passed - how this is structured or deployed is completely flexible and customizable. Please note when assigning the `agentId` that no data will be available for that particular agent until the agent has sent at least 1 utterance via the `dump` API. 

## APIs
There is one API within the Jupita Agent product – `dump`:

- `Dump` allows you to dump each communication utterance.


##  Quickstart

### Installation

```
npm install @jupita/jupita-agent-sdk
```


The first step is to initialize the SDK and add the required authentication parameters such as `token`, `agentId` then, initialize the class object.

### Initialization

```
const { Agent } = require("@jupita/jupita-agent-sdk")
const token = '<authentication token>'
const agentId = '2'
const agent = new Agent(token, agentId)
```

### Call `Dump` API

When calling the `dump` API, for example from a conversation with `3` being the `clientId` and the message being "hello", you should specify the `text`, `clientId`, and the `messageType` (since message dumps are seen as by default from an agent unless otherwise specified) parameters sequentially;
```
const { Agent, MessageType } = require("@jupita/jupita-agent-sdk")

agent.dump("Hello", 3, MessageType.Client)
```

When you want to dump a message from an audio call (`isCall`) conversation, you may add an additional boolean parameter. `true` meaning the message is from an audio call, and `false` meaning it is not;

```
agent.dump("Hello", 3, MessageType.Client, true)
```

Currently, as there is no data logged into the console (as you did not define a listener), you may define as per below;
```
agent.dump("Hello", 3, MessageType.Client, true, {
    onError: (statusCode, response) => {
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: (week) => {
        console.log(week)
    }
})
```

- `messageType` is `MessageType.Agent`, meaning that the message has come from an agent,
- `isCall` is `false`,
- `listener` is null, so no listener called.

If the API returns 200 the response is a JSON object;

```
{
"message": "Dumped Conversation",
"score": 62.0781855859
}
```

## Error Codes

Error codes thrown are `401` when the token is incorrect and `400` when there is an attempt to dump gibberish content to the server, although the model does have an inbuilt gibberish detector.

## Error Handling

The SDK has an `InvalidParameterException` exception that will arises when:
- `messageType` parameter in the `dump` method is not `1` or `0`


## Libraries

Use Step [Initialization](#initialization) so
that the Jupita Agent Web SDK is available within the scope of the project.


## Classes

The available product under this SDK is Jupita Agent. You may construct Jupita Agent by the public constructor and pass the two required parameters:

- Your authentication token,
- Your `agentId`.

Then, [initialize](#initialization).

## Class Method Definition

### `Dump` Method Definition

```
dump(text: string, clientId: number, messageType: number = MessageType.Agent, isCall: boolean = false, listener?: Listener)
```

* text (required)
* clientId (required)
* messageType (optional, default = Agent)
* isCall (optional, default=false)
* listener (optional)

To avoid illegal argument error for the `messageType` argument, use `MessageType.Agent` for agent, and `MessageType.Client` for client.
