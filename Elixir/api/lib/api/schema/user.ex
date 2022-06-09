defmodule Api.Schema.User do
  use Ecto.Schema

  schema "user" do
    field :name, :string
    field :email, :string
    field :password, :string

    timestamps()
  end
end
