defmodule :"Elixir.Api.Repo.Migrations.Create-user-table" do
  use Ecto.Migration

  def change do
    create table("user") do
      add :name, :string, size: 100
      add :email, :string, size: 100
      add :password, :string

      timestamps()
    end
  end
end
