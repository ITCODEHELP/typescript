![npm](https://img.shields.io/npm/v/@jupita/jupita-sdk)

# Jupita Typescript SDK
This library will allow you to make the required `dump` API calls with Jupita. All API calls are made asynchronously, thus there are event listeners available to handle the API results.


## Overview
Jupita is an API product that provides deep learning powered touchpoint analytics. Within the SDK documentation, `messageType` refers to which user the utterance is from. `messageType` 0 = `touchpoint`, and `messageType` 1 = `input`, although these labels are handled by the SDK.

The required parameters for the APIs include setting `messageType`, along with assigning an `touchpointId` + `inputId` to be passed - how this is structured or deployed is completely flexible and customizable. Please note when assigning the `touchpointId` that no data will be available for that particular touchpoint until the touchpoint has sent at least 1 utterance via the `dump` API. 


## APIs
There is one API within the Jupita product – `dump`:

- `dump` allows you to dump each communication utterance.


##  Quickstart
### Step 1
Install Jupita;

```
npm install @jupita/jupita-sdk
```

### Step 2
Build Jupita. Insert your API key as the token as well as a touchpoint user ID. In the example below '2' represents the touchpointId;

```
const { Jupita } = require("@jupita/jupita-sdk")
const token = '<authentication token>'
const touchpointId = '2'
const jupita = new Jupita(token, touchpointId)
```

### Step 3
Dump an utterance from a touchpoint by calling the dump API as a message by specifying the message text and the ID of the input, represented in the example below as '3'. Message dumps are by default from a touchpoint unless otherwise specified. 

The parameter `isCall` is required and set to false by default. This tells Jupita if the utterance is from an audio call. When dumping an utterance from an audio call, set the `isCall` parameter to `true` otherwise set to `false`;

```
const { Jupita, MessageType } = require("@jupita/jupita-sdk")

jupita.dump("Hi, how are you?", 3, MessageType.Touchpoint, false)
```

Similarly, call the dump API whenever dumping an utterance from an input by specifying the message text and ID of the input;
```
const { Jupita, MessageType } = require("@jupita/jupita-sdk")

jupita.dump("Hi, good thanks!", 3, MessageType.Input, false)
```

Additionally, you may define a listener as per below;

```
jupita.dump("Hi, good thanks!", 3, MessageType.Input, false)
    onError: (statusCode, response) => {
        console.log(statusCode)
        console.log(response)
    }, 
    onSuccess: (week) => {
        console.log(week)
    }
})
```

## Error handling
The SDK throws 2 errors:
- JSONException which occurs if the user input is not json compatible. This can be incorrect usage of strings when passed on to the Jupita methods.
- IllegalArgumentException which occurs if the `messageType` set in the dump method is not 1 or 0.


## Error Codes
Error codes thrown are 401 when the token is incorrect, otherwise Jupita returns error 400 with details.


## Libraries
Use Step 1 and 2 so that the Jupita Android SDK is available within the scope of the project.


## Classes
The available product under the Typescript SDK is Jupita. Jupita can be constructed directly using the public constructor but it is highly recommended to use the built class. This will ensure that mistakes are not made while building Jupita.

```
const { Jupita } = require("@jupita/jupita-sdk")
const token = '<authentication token>'
const touchpointId = '2'
const jupita = new Jupita(token, touchpointId)
```


## `dump` Method Definition

```
dump(text: string, inputId: number, messageType: number = MessageType.Touchpoint, isCall: boolean = false, listener?: Listener)
```

* text (required)
* inputId (required)
* messageType (required, default = Touchpoint)
* isCall (required, default=false)
* listener (optional)

To avoid illegal argument error for the `messageType` argument, use `MessageType.Touchpoint` for touchpoint, and `MessageType.Input` for input.

If you require additional support please contact support@jupita.io
