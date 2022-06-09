# IO.puts "Hello, World!"

{:ok, file} = File.read("input.txt")

# KeyWordList
{_, _, ans} =
  String.split(file, "\n", trim: true)
  |> Enum.map(&String.to_integer/1)
  |> Stream.cycle()
  |> Stream.scan(&Kernel.+/2)
  |> Stream.scan({MapSet.new(), false, 0}, fn item, {set, _, _} ->
    # IO.inspect(set)
    case MapSet.member?(set, item) do
      true -> {set, true, item}
      false -> {MapSet.put(set, item), false, item}
    end
  end)
  |> Stream.drop_while(fn {_, isDupl, _} ->
    !isDupl
  end)
  # hd()
  |> Enum.take(1)
  |> hd()

IO.inspect(ans)

# |> Enum.sum   #Enum.reduce(&Kernel.+/2)
# |> IO.inspect()

# IO.puts file

# https://hub.docker.com/_/mysql
