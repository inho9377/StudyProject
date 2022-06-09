defmodule Api.User do
  import Ecto.Query
  alias Api.Repo
  alias Api.Schema.User, as: UserSchema

  def get_users() do
    Repo.all(from user in UserSchema, select: user)
  end
end
