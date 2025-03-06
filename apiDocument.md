# Villa API Documentation

## Endpoint: Get Villa Detail

Retrieves detailed information about a specific villa by its ID.

### Request

```
GET /api/Villa/detail/{homeId}
```

#### Path Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| homeId | string | Yes | Unique identifier of the villa |

### Response

#### Success Response

**Code**: 200 OK

**Content Type**: application/json

**Response Body**: Villa object containing detailed information

#### Villa Object Structure

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier of the villa |
| title | string | Name of the villa |
| url | string | URL-friendly slug for the villa |
| description | string | HTML formatted detailed description |
| metaTitle | string | SEO title for the villa |
| metaDescription | string | SEO description for the villa |
| type | string | Type of property (e.g., "Kiralık Villalar") |
| destination | string | Location of the villa (e.g., "Ovacık") |
| room | integer | Total number of rooms |
| bedroom | integer | Number of bedrooms |
| bathroom | integer | Number of bathrooms |
| floor | integer | Number of floors |
| capacity | integer | Maximum number of guests |
| currency | string | Currency for prices (e.g., "tl") |
| deposit | integer | Deposit percentage |
| damageDeposit | integer | Damage deposit amount |
| checkInTime | string | Check-in time (e.g., "16.00") |
| checkOutTime | string | Check-out time (e.g., "10.00") |
| heating | string | Heating system type |
| klima | integer | Air conditioning availability (1 = yes, 0 = no) |
| ribbon1 | string | Primary highlight text |
| ribbon2 | string | Secondary highlight text |
| features | array | List of villa features and amenities |
| types | array | Categories the villa belongs to |
| highlights | array | Key selling points of the villa |
| included | array | Services included in the price |
| notIncluded | array | Services not included in the price |
| pools | array | Information about swimming pools |
| rooms | array | Detailed information about each room |
| distances | array | Distances to important locations |
| prices | array | Pricing information for different date ranges |
| images | array | URLs to villa images |
| latitude | number | Geographic latitude coordinate |
| longitude | number | Geographic longitude coordinate |
| lastContentUpdate | string | ISO date of last content update |
| lastPricesUpdate | string | ISO date of last price update |

#### Pools Object Structure

| Field | Type | Description |
|-------|------|-------------|
| name | string | Pool type identifier |
| value | string | Availability status |
| depth | string | Pool depth |
| width | string | Pool width |
| length | string | Pool length |

#### Rooms Object Structure

| Field | Type | Description |
|-------|------|-------------|
| title | string | Room name |
| items | array | List of items in the room |

#### Room Items Object Structure

| Field | Type | Description |
|-------|------|-------------|
| title | string | Item name |
| count | integer | Number of this item in the room |
| value | string | Additional information about the item |

#### Distances Object Structure

| Field | Type | Description |
|-------|------|-------------|
| type | string | Type of location (e.g., "Havalimanı") |
| title | string | Name of the location |
| value | string | Distance to the location |

#### Prices Object Structure

| Field | Type | Description |
|-------|------|-------------|
| startDate | string | Start date of the price period |
| endDate | string | End date of the price period |
| price | number | Nightly rate in the specified currency |
| minNight | integer | Minimum number of nights required for booking |
| cleaningNight | integer | Number of nights after which cleaning is required |
| cleaningPrice | number | Price for cleaning service |
| heating | number | Additional heating cost |

### Example

#### Request
```
GET /api/Villa/detail/34
```

#### Response
```json
{
  "id": "34",
  "title": "VİLLA MASSİMO",
  "url": "villa-massimo",
  "description": "<p>Villamız Fethiye- Ovacık mevkiinde yer almaktadır...</p>",
  ...
}
```

### Error Responses

This endpoint documentation doesn't specify error responses, but typical errors might include:

| Status Code | Description |
|-------------|-------------|
| 404 | Villa not found |
| 500 | Internal server error |