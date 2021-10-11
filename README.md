
![npm](https://img.shields.io/npm/v/@jupita/jupita-sdk)

# Jupita Typescript SDK

This library will allow you to make the required `dump` API calls with Jupita. All API calls are made asynchronously, thus there are event listeners available to handle the API results.

## Overview
Jupita is an API product that provides deep learning powered touchpoint analytics. Within the SDK documentation, `messageType` refers to which user the utterance is from. `messageType` 0 = `touchpoint`, and `messageType` 1 = `input`, although these labels are handled by the SDK.

The required parameters for the APIs include setting `messageType`, along with assigning an `touchpointId` + `inputId` to be passed - how this is structured or deployed is completely flexible and customizable. Please note when assigning the `touchpointId` that no data will be available for that particular touchpoint until the touchpoint has sent at least 1 utterance via the `dump` API. 

## APIs
There is one API within the Jupita product – `dump`:

- `Dump` allows you to dump each communication utterance.


##  Quickstart

### Installation

```
npm install @jupita/jupita-sdk
```


The first step is to initialize the SDK and add the required authentication parameters such as `token`, `touchpointId` then, initialize the class object.

### Initialization

```
const { Jupita } = require("@jupita/jupita-sdk")
const token = '<authentication token>'
const touchpointId = '2'
const jupita = new Jupita(token, touchpointId)
```

### Call `Dump` API

When calling the `dump` API, for example from a conversation with `3` being the `inputId` and the message being "hello", you should specify the `text`, `inputId`, and the `messageType` (since message dumps are by default from a touchpoint unless otherwise specified) parameters sequentially;
```
const { Jupita, MessageType } = require("@jupita/jupita-sdk")

jupita.dump("Hello", 3, MessageType.Input)
```

When you want to dump a message from an audio call (`isCall`) conversation, you may add an additional boolean parameter. `true` meaning the message is from an audio call, and `false` meaning it is not;

```
jupita.dump("Hello", 3, MessageType.Input, true)
```

Currently, as there is no data logged into the console (as you did not define a listener), you may define as per below;
```
jupita.dump("Hello", 3, MessageType.Input, true, {
    onError: (statusCode, response) => {
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: (week) => {
        console.log(week)
    }
})
```

- `messageType` is `MessageType.Touchpoint`, meaning that the message has come from a touchpoint,
- `isCall` is `false`,
- `listener` is null, so no listener called.

The HTTP 200 response will return a JSON object;

```
{
"message": "Dumped Conversation",
"score": 88.0781855859
}
```

## Error Codes

Error codes thrown are `401` when the token is incorrect and `400` when there is an attempt to dump gibberish content to the server, although the model does have an inbuilt gibberish detector.

## Error Handling

The SDK has an `InvalidParameterException` exception that will arises when:
- `messageType` parameter in the `dump` method is not `1` or `0`


## Libraries

Use Step [Initialization](#initialization) so
that the Jupita Web SDK is available within the scope of the project.


## Classes

The available product under this SDK is Jupita. You may construct Jupita by the public constructor and pass the two required parameters:

- Your authentication token,
- Your `touchpointId`.

Then, [initialize](#initialization).

## Class Method Definition

### `Dump` Method Definition

```
dump(text: string, inputId: number, messageType: number = MessageType.Touchpoint, isCall: boolean = false, listener?: Listener)
```

* text (required)
* inputId (required)
* messageType (optional, default = Touchpoint)
* isCall (optional, default=false)
* listener (optional)

To avoid illegal argument error for the `messageType` argument, use `MessageType.Touchpoint` for touchpoint, and `MessageType.Input` for input.
