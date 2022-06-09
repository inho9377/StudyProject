{:ok, file} = File.read("input-part2.txt")

foo = String.split(file, "\n", trim: true)
|> Enum.map(&String.graphemes/1)
# |> Enum.map(fn list ->
#   Enum.reduce(list, %{}, fn item, acc ->
#     Map.update(acc, item, 1, fn value ->
#       value + 1
#     end)
#   end)
# end)
|> Enum.map(&Enum.frequencies/1)
|> Enum.map(fn map ->
  Enum.reduce(map, {0, 0}, fn
    {_, 2}, {two, three} -> {two + 1, three}
    {_, 3}, {two, three} -> {two, three + 1}
    _, acc -> acc
  end)
end)

count_2 = Enum.count(foo, fn {two, _} ->
  two > 0
end)
count_3 = Enum.count(foo, fn {_, three} ->
  three > 0
end)
ans = count_2 * count_3
IO.puts("Answer : #{ans}")
