db.createUser({
    user: "test",
    pwd: "testing",
    roles: [
      { role: "clusterMonitor", db: "admin" },
      { role: "readAnyDatabase", db: "admin" },
      { role: "read", db: "local" }
    ]
  });
  