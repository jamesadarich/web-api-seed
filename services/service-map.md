

  ╔══════════════╗        ╔═══════════════╗
  ║ Read Service ║        ║ Write Service ║
  ╚══════════════╝        ╚═══════════════╝
          ^                       ┆
          ┆                       V
╔═════════════════╗        ╔═════════════╗       ╔═════════╗
║ Aggregate Store ║ <------║ Event Store ║------>║ Workers ║
╚═════════════════╝        ╚═════════════╝       ╚═════════╝

EVENTS

ID (uuid)
TYPE (string)
TRANSACTION_ID (uuid) <--- don't know if this is necessary (may be useful to determine side effects or multiple actions taken at one time? on the other hand perhaps it's good to enforce segregation and single actions at a time)
AUTHOR_ID (int) <--- don't know if these can be uuids too (performance impact perhaps?)
AGGREGATE_ID (int) <--- don't know if these can be uuids too (performance impact perhaps?)
TIMESTAMP (datetime)
PAYLOAD (json)

X/Created
X/Updated
X/Deleted
X/YAdded
X/YRemoved
