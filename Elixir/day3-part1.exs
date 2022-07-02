{:ok, file} = File.read("input-part3.txt")

lines = String.split(file, "\n", trim: true)

counting =
  1..String.length(hd(lines))
  |> Enum.reduce(%{}, fn item, acc ->
    Map.put(acc, item - 1, %{zero: 0, one: 0})
  end)

foo =
  String.split(file, "\n", trim: true)
  |> Enum.reduce(counting, fn item, acc ->
    item
    |> String.graphemes()
    |> Enum.with_index()
    |> Enum.reduce(acc, fn
      {"1", index}, chAcc ->
        Map.update!(chAcc, index, fn %{one: one, zero: zero} -> %{one: one + 1, zero: zero} end)

      {"0", index}, chAcc ->
        Map.update!(chAcc, index, fn %{one: one, zero: zero} -> %{one: one, zero: zero + 1} end)
    end)
  end)


up =
  Enum.map(foo, fn {_, %{one: one, zero: zero}} ->
    cond do
      zero > one -> "0"
      one > zero -> "1"
    end
  end)
  |>Enum.join()
  |>String.to_integer(2)
  |>IO.inspect()

  down =
    Enum.map(foo, fn {_, %{one: one, zero: zero}} ->
      cond do
        zero > one -> "1"
        one > zero -> "0"
      end
    end)
    |>Enum.join()
    |> String.to_integer(2)
    |>IO.inspect()

  # String.to_integer(up, 2)
  # |>IO.inspect()
  #  * String.to_integer(down, 2)
  # |> IO.inspect()
