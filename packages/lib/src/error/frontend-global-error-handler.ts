interface ErrorJson {
  error: string;
}

export function checkForError(json: any): ErrorJson | null {
  console.log('stringify',JSON.stringify(json))
  console.log('check json', Object.keys(json).length, json)
  if (Object.keys(json).length === 1 && json.hasOwnProperty("error")) {
    return json as ErrorJson;
  } else {
    return null;
  }
}