defmodule ApiWeb.UserView do
  use ApiWeb, :view
  def render("users.json", %{users: users}) do
    users
    |> IO.inspect()
    |> Enum.map(&Map.take(&1, [:id, :name, :email, :pasword, :inserted_at, :updated_at]))
  end
end
