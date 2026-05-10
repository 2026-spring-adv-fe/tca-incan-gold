import {marshall, unmarshall} from "@aws-sdk/util-dynamodb";
import {type Game} from "./Game.ts";

const APP_NAME = "tca-incan-gold";
const API_URL = "https://32wop75hhc.execute-api.us-east-1.amazonaws.com/prod/data";

const saveGame = async (email: string, game: Game) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length == 0) {
        return;
    }

    const timestamp = Date.now();

    const dynamoGame = {
        pk: trimmedEmail,
        sk: `${APP_NAME}#${timestamp.toString()}`,
        user: trimmedEmail,
        app: APP_NAME,
        gsi1pk: APP_NAME,
        gsi1sk: timestamp.toString(),
        game: game
    };

    const marshalledGame = marshall(dynamoGame, {removeUndefinedValues: true, convertClassInstanceToMap: true});

    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            TableName: "tca-data",
            Item: marshalledGame
        })
    });
};

const loadGames = async (email: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (trimmedEmail.length == 0) {
        return [];
    }

    const url = API_URL + `?user=${trimmedEmail}&game=${APP_NAME}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!("Items" in data)) {
        console.error("Items was not in data: ", data);
        return [];
    }
    const unmarshalledData = data.Items.map((x: any) => unmarshall(x));
    const games = unmarshalledData.map((x: any) => x.game);
    if (!games) {
        return [];
    }
    return games;
};

export {saveGame, loadGames};
