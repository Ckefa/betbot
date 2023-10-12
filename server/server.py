#!/usr/bin/env python3


from server.master import Master, timer

import json
import asyncio
import websockets

active_users = 0


async def handle_connection(websocket, path):
    global active_users
    active_users += 1
    try:
        async for message in websocket:
            print(f"[Received]: {message}")

            if message == "update":
                data = {
                    "time": timer.get_time(),
                    "md": ms.md,
                    "fixtures": ms.ongoing,
                    "results": ms.completed,
                    "table": ms.table,
                }
                data = json.dumps(data)
                await websocket.send(data)
            else:
                await websocket.send("MESSAGE RECEIVED!")
    except Exception as e:
        print("[DISCONNECTED]")

    finally:
        active_users -= 1


async def monitor_connections():
    while True:
        print(f"[ACTIVE]: {active_users}")
        await asyncio.sleep(5)


ms = Master()

start_server = websockets.serve(handle_connection, "0.0.0.0", 5055)
asyncio.get_event_loop().create_task(monitor_connections())
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
