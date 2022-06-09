defmodule ApiWeb.HelloController do
  use ApiWeb, :controller

  # require, import
  alias Api.HelloWorld, as: HelloWorld

  def hello(conn, _) do
    text(conn, "Hello from #{HelloWorld.hello()}")
  end

  def hello_json(conn, param) do
    json(conn,
    %{
      message: "Hello, world!",
      owner: "inho",
      power: "unlimited",
      pid: inspect(self),
      param: param
    })
  end
end
