/** @type {import('next').NextConfig} */

const nextConfig = {
  async headers(){
    return [ 
      {
        source:'/reserve.:path*',
        headers:[
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
        ]
      }
    ]
  },
}

module.exports = nextConfig
