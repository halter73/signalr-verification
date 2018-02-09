using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

public class BroadcastHub : Hub
{
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync("Receive", $"{Context.ConnectionId} joined.");
    }

    public override async Task OnDisconnectedAsync(Exception ex)
    {
        await Clients.All.SendAsync("Receive", $"{Context.ConnectionId} left.");
    }

    public async Task Broadcast(string message)
    {
        await Clients.All.SendAsync("Receive", $"{Context.ConnectionId}: {message}");
    }
}