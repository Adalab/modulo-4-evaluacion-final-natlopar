
# 🎶API music albums
 

Use this API to see some of my favourite music albums!🎸


## API Reference

#### Get all albums

``GET /albums``

Returns a list of all albums.
- Method: GET
- Endpoint: /albums
- Success Response:
  - Code: 200 OK
  - Content: { "success": true,
   "albums": [{

      "idAlbum": 1,
      "nameAlbum": "Album Name",
      "nameBand": "Band Name",
      "yearAlbum": 2022,
      "length": "45:30",
      "gendre": "Rock"
    },
    {
      
      "idAlbum": 2,
      "nameAlbum": "Another Album",
      "nameBand": "Another Band",
      "yearAlbum": 2023,
      "length": "01:02:15",
      "gendre": "Pop"
    },
    ...


   ]}
 



#### Get album by music gendre or band name


``GET /album?nameBand=value1&gendre=value2``

```http://localhost:4000/album?nameBand=${nameBand}&gendre=${gendre}```
``` Ex: http://localhost:4000/album?gendre=rock```


Filters albums by either album name or musical gendre.
- Method: GET
- Endpoint: /albums
- Query Parameters:
    - nameBand (optional): Band name to filter by or "".
    - gendre (optional): Gendre to filter by or "".
- Success Response:
    - Code: 200 OK
    - Content: { "success": true,
    "albums": [{

      "idAlbum": 1,
      "nameAlbum": "Album Name",
      "nameBand": "Band Name",
      "yearAlbum": 2022,
      "length": "45:30",
      "gendre": "Rock"
    }]}



####  Update an existing album

``PUT /album/:id``

Updates an existing album.

- Method: PUT
- Endpoint: /album/:id
- Path Parameters:
    - id: The ID of the album to be updated.
- Success Response:
    - Code: 200 OK
    - Content: { 
        "success": true,
        "message": "Album updated successfully"}



#### Delete album

DELETE /album

Deletes an album.

- Method: DELETE
- Endpoint: /album
- Query Parameters:
    - id: The ID of the album to be deleted.
- Success Response:
    - Code: 200 OK
    - Content: {"success": true, "message": "Album deleted successfully"}


## Tecnologías usadas 
- Node JS
- Express JS
- MySQL Workbench



## Autora  👩

[![Autor](https://img.shields.io/badge/-%20Natalia%20López%20-%20?logo=github&labelColor=black&color=purple)](
https://github.com/natlopar)
