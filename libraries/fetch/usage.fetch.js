import fetch from "node-fetch";

export default function postUsage(pathname, query) {
  const data = {
    ip: "181.67.237.8",
    location: {
      country: {
        name: "Peru",
      },
      region: {
        name: "Cusco",
      },
      city: "Cusco",
      latitude: -13.52066,
      longitude: -71.97587,
    },
    user_agent: {
      name: "Chrome",
      device: {
        type: "desktop",
      },
      os: {
        name: "Windows NT",
      },
    },
  };
  fetch(`/api/usage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.USAGE_API_SEED}`,
    },
    body: JSON.stringify({
      route: pathname,
      ...data,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("usage.fetch ->", data);
    });
}
