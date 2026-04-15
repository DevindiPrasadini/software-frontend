import { createClient } from "@supabase/supabase-js";

let url = "https://dzebvhhdxglmuksuvsgo.supabase.co"
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6ZWJ2aGhkeGdsbXVrc3V2c2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyMjMzNzEsImV4cCI6MjA5MTc5OTM3MX0.nsaL-haddL-XoFwEyDZZE_PZSmXcOn-2NjY7xKZwsys"
const supabase = createClient(url, key);

export default function uploadMedia(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected")
        } else {
            const timeStamp = new Date().getTime();
            const fileName = timeStamp + " " + file.name;

            supabase.storage.from("images").upload(fileName, file, {
                upsert: false,
                cacheControl: "3600"

            }).then((response) => {
                console.log(response)
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);

            }).catch((error) => {
                reject(error)
            })

        }
    })

}

