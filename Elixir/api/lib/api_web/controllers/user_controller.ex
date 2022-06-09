defmodule ApiWeb.UserController do
  use ApiWeb, :controller
  alias Api.User

  def index(conn, _params) do
    render(conn, "users.json", users: User.get_users())
  end
end
