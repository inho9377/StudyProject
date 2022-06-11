defmodule Solution do
  def get_same_count(str1, str2) do
    make_tuple_list(String.graphemes(str1), String.graphemes(str2))
    |> Enum.filter(fn {item1, item2} -> item1 == item2 end)
    |> Enum.count()
  end

  def make_tuple_list([], []) do
    []
  end

  def make_tuple_list([head1 | tail1], [head2 | tail2]) do
    [{head1, head2} | make_tuple_list(tail1, tail2)]
  end

  # 기저 케이스를 위쪽에 (패턴 매칭은 위쪽부터) => 재귀가 끝나는 부분 먼저
  def make_sequence_tuple_list(list1 = [head1 | tail1], []) do
    []
  end

  def make_sequence_tuple_list(list1 = [head1 | tail1], [head2 | tail2]) do
    [{head1, head2} | make_sequence_tuple_list(list1, tail2)]
  end

  def pairing([]) do
    []
  end

  def pairing(list = [head | tail]) do
    make_sequence_tuple_list(list, tail) ++ pairing(tail)
  end
end

# Solution.make_tuple_list([1,2,3,4,5], [6,7,8,9,10])
# |> IO.inspect()
# Solution.get_same_count("abcdefg", "acbdefg")
# |> IO.inspect()

{:ok, file} = File.read("input-part2.txt")

[{str1, str2, _}] =
  String.split(file, "\n", trim: true)
  |> Solution.pairing()
  |> Enum.map(fn {str1, str2} ->
    {str1, str2, String.length(str1) - Solution.get_same_count(str1, str2)}
  end)
  |> Enum.filter(fn {_, _, item} -> item == 1 end)

Solution.make_tuple_list(String.graphemes(str1), String.graphemes(str2))
|> Enum.filter(fn {ch1, ch2} ->
  ch1 == ch2
end)
|> Enum.map(fn {ret, _} ->
  ret
end)
|> to_string()
|> IO.inspect()
