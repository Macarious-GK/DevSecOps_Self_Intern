db.createUser({
    user: "test",
    pwd: "testing",
    roles: [
      { role: "clusterMonitor", db: "admin" },
      { role: "read", db: "local" }
    ]
  });
  