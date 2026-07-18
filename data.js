const rawData = `1. Write a program to print "Hello, World" to the console.
2. Write a program to print your Name, Age, and Address on three separate lines.
3. Write a program to print the sentence: "C" and "Python" are popular languages. (Includes the double quotes in the output).
4. Write a program to print a simple triangle or square pattern using asterisks (*) and manual line breaks.
5. Write a program to accept two numbers and display their addition, subtraction, multiplication, and division.
6. Write a program to accept the radius of a circle and calculate its area.
7. Write a program to accept the length and breadth of a rectangle and calculate its area.
8. Write a program to convert temperature from Celsius to Fahrenheit.
9. Write a program to convert temperature from Fahrenheit to Celsius.
10. Write a program to accept marks of five subjects and calculate the total marks and percentage.
11. Write a program to accept two numbers and determine which number is greater (Without using if-else).
12. Write a program to accept three numbers and determine which number is greater (Without using if-else).
13. Write a program to accept a number and check whether it is positive or negative or zero (Without using if-else).
14. Write a program to swap two numbers using a third variable.
15. Write a program to swap two numbers without using a third variable.
16. Write a program to accept two numbers and check whether they are equal or not.
17. Write a program to accept a number and check whether it is even or odd (Without using if-else and % operator).
18. Write a program to take a number as input and print its square and cube.
19. Write a program to delete the last two digits of any user given input number.
20. Write a program to find the last digit of a number without using % modulus operator.
21. Write a program to exchange the last two digits of any user given input number.
22. Write a program to take a character (In Python string) as input and check if it is an alphabet, digit, or special character.
23. Write a program to take a character (In Python string) as input and check if it is uppercase or lowercase.
24. Write a program to check whether an input alphabet is a vowel or consonant.
25. Write a program to check whether a given year is a leap year or not.
26. Write a program to check whether a given number is divisible by 5 and 11.
27. Write a program to find the largest of four numbers.
28. Write a program to find the second largest of three numbers.
29. Write a program to find the smallest of four numbers.
30. Write a program to find the second smallest of three numbers.
31. Write a program to calculate the gross salary of an employee by accepting basic salary. (HRA=20%, DA=10%).
32. Write a program to accept a month number and display the number of days in that month.
33. Write a program to accept a number and print number of digits.
34. Write a program to display the month name using month number with switch case.
35. Write a program to check whether an entered character is a vowel using switch case.
36. Input an integer n, perform the following conditional actions, If n is odd, print weird, If n is even and in the inclusive range of 2 to 5, print not weird, If n is even and in the inclusive range 6 to 20, print weird, If n is even and greater than 20, print not weird.
37. Write a program to calculate the free number of cups the user gets for a specified number of cups bought by the user. In this particular case, the user gets 1 cup free for every 6 cups bought. (Example: If the user buys 12 cups, he gets 2 cups free as per the Buy 6 Get 1 Free offer, and hence the output will be 12+2=14 cups).
38. Write a program to accept marks and display the grade according to the following conditions: Marks ≥90 → Grade A, Marks 75→ Grade B, Marks ≥60 → Grade C, Marks 40 → Grade D, Marks 40 → Fail.
39. Write a program to calculate the electricity bill based on the following conditions: First 100 units → Rs. 2 per unit, Next 100 units → Rs. 3 per unit, Above 200 units → Rs. 5 per unit.
40. Write a program to check password strength: Weak: < 6 chars, Moderate: 6-10 chars with letters only, Strong: 6-10 chars with letters and digits, Very Strong: > 10 chars with letters, digits, special chars.
41. Write a program to calculate final price after discount: Above 5000: 20% discount, 2000-5000: 10% discount, Below 2000: 5% discount.
42. A weather app shows alerts based on rainfall. write a program to accept rainfall in mm and display No Rain (0 mm), Light Rain (1-10 mm), or Heavy Rain (> 10 mm).
43. A highway toll plaza charges Rs. 60 for cars and Rs.100 for trucks. At the end of the day, the manager notes the number of cars and trucks. write a program to calculate the total collection and check whether the plaza made profit (collection >= Rs. 10,000) or loss.
44. A bank approves a loan only if the applicant's monthly income is at least 3 times the EMI. write a program to accept monthly income and EMI and decide whether the loan is approved or rejected.
45. A university gives scholarship based on average marks and family income. Scholarship is given if average marks >=75 and family income <= Rs. 2,00,000. Write a program to check whether a student gets scholarship or not.
46. An exam system gives grace marks if a student fails by 5 marks or less. write a program to accept marks obtained (out of 100) and decide whether the student passes normally, passes by grace, or fails.
47. An ATM allows withdrawal only if: Withdrawal amount is a multiple of 100, and Account balance after withdrawal remains >= Rs. 500. Write a program to accept balance and withdrawal amount and decide whether the transaction is successfulor failed.
48. You are programming the logic for an old ATM that only dispenses cash in denominations of 500, 100, and 10. The bank wants to minimize the number of notes given to a customer. However, there is a catch: The machine cannot dispense amounts that are not multiples of 10. Output will be number of 500 notes, 100 notes and 10 notes.
49. A trekker is crossing a desert. He has a canteen with a specific capacity in liters. He drinks 250ml of water every 1 kilometer. Your task is to take input of canteen capacity in liters and the total distance of the trek in kilometers and print yes if he has enough water to finish the trek. If not, print how many additional liters he needs to carry.
50. An astronaut has an oxygen tank with P pressure. If pressure is above 100, it's Safe, if between 50 and 100, it's Warning, below 50, it's Critical. However, if the temperature T is above 200°c, any pressure above 80 is instantly Danger. Your Task is to take input P and T, then print the safety status.
51. Write a program to print numbers from 1 to 10 using a loop.
52. Write a program to print numbers from 10 to 1 using a loop.
53. Write a program to print all even numbers from 1 to 50.
54. Write a program to print all odd numbers from 1 to 50.
55. Write a program to print numbers from 1 to N.
56. Write a program to calculate the sum of numbers from 1 to N.
57. Write a program to print the multiplication table of a given number.
58. Write a program to print squares of numbers from 1 to N.
59. Write a program to print cubes of numbers from 1 to N.
60. Write a program to print numbers divisible by 3 between 1 and N.
61. Write a program to print numbers divisible by 5 between 1 and N.
62. Write a program to print numbers divisible by both 3 and 5 between 1 and N.
63. Write a program to print numbers between two given limits.
64. Write a program to print ASCII values of characters from A to Z.
65. Write a program to print lowercase alphabets from a to z.
66. Write a program to print even numbers in reverse order up to N.
67. Write a program to print odd numbers in reverse order up to N.
68. Write a program to calculate the sum of even numbers up to N.
69. Write a program to calculate the sum of odd numbers up to N.
70. Write a program to calculate the factorial of a given number.
71. Write a program to count the number of digits in a given number.
72. Write a program to calculate the sum of digits of a given number.
73. Write a program to calculate the sum of digits till single digit of a given number.
74. Write a program to calculate the product of digits of a given number.
75. Write a program to reverse a given number.
76. Write a program to check whether a number is a palindrome or not.
77. Write a program to check whether a number is an Armstrong number.
78. Write a program to check whether a number is a perfect number.
79. Write a program to check whether a number is a prime number.
80. Write a program to print all prime numbers between 1 and N.
81. Write a program to print Nth prime number.
82. Write a program to find sum of prime digits present in given number N.
83. Write a program to find the sum of prime numbers up to N.
84. Write a program to count total prime digits in a number.
85. Write a program to print Fibonacci series up to N terms.
86. Write a program to print Nth Fibonacci number.
87. Write a program to calculate the power of a number without using built-in functions.
88. Write a program to find the largest digit in a given number.
89. Write a program to find the second largest digit in a given number.
90. Write a program to find the smallest digit in a given number.
91. Write a program to find the second smallest digit in a given number.
92. Write a program to count even and odd digits in a number.
93. Write a program to find the sum of first and last digit of a number.
94. Write a program to find the sum of squares of digits of a number.
95. Write a program to count the frequency of a given digit in a number.
96. Write a program to print all factors of a given number.
97. Write a program to count the total number of factors of a number.
98. Write a program to calculate HCF of two numbers using a loop.
99. Write a program to calculate LCM of two numbers using a loop.
100. Write a program to check whether a number is an Armstrong number.
101. Write a program to print all Armstrong numbers between 1 and N.
102. Write a program to check whether a number is a perfect number.
103. Write a program to print all perfect numbers between 1 and N.
104. Write a program to check whether a number is a strong number.
105. Write a program to print all strong numbers between 1 and N.
106. Write a program to print numbers which are perfect squares between 1 and N.
107. Write a program to print numbers which are perfect cubes between 1 and N.
108. Write a program to calculate the sum of factorials of digits of a number.
109. Write a program to check whether two numbers are co-prime.
110. Write a program to find the difference between the sum of even and odd digits.
111. Write a program to count total composite digits in a number.
112. Write a program to print all numbers between 1 and N which are divisible by 7 but not divisible by 5.
113. Write a program to find the sum of digits of all numbers between 1 and N.
114. Write a program to print all numbers between 1 to N whose digit sum is even.
115. Write a program to print all numbers between 1 to N whose digit sum is odd.
116. Write a program to print all numbers between X and Y, whose reverse is greater than the original number.
117. Write a program to check whether a number is a duck number or not.
118. Write a program to print all duck numbers between 1 and N.
119. Write a program to check whether the given number is lucky or unlucky. If the sum of its digits is divisible by 4, the number is considered lucky.
120. Write a program for a given number to find the absolute difference between the number and its reverse. If the difference is divisible by 9, print Magic Number, otherwise Not Magic Number.
121. Write a program to find Nth term. 1, 2, 1, 3, 2, 5, 3, 7, 5, 11, 8, 13, 13, 17....
122. Write a program to find Nth term. 0, 0, 2, 1, 4, 2, 6, 3, 8, 4, 10, 5, 12, 6, 14, 7, 16, 8....
123. Write a program to convert a decimal number to a binary number.
124. Write a program to convert a decimal number to an octal number.
125. Write a program to convert a decimal number to a hexadecimal number.
126. Write a program to convert an octal number to a binary number.
127. Write a program to convert an octal number to a decimal number.
128. Write a program to convert an octal number to a hexadecimal number.
129. Write a program to convert a hexadecimal number to a binary number.
130. Write a program to convert a hexadecimal number to an octal number.
131. Write a program to convert a hexadecimal number to a decimal number.
132. Write a program to convert a binary number to an octal number.
133. Write a program to convert a binary number to a decimal number.
134. Write a program to convert a binary number to a hexadecimal number.
135. Write a program to perform addition of binary numbers.
136. Print the pattern: 1 / 12
137. Print the pattern: 123 / 1234 / 12345
138. Print the pattern: 5 / 45 / 345 / 2345 / 12345
139. Print the pattern: * / ** / *** / **** / *****
140. Print the pattern: 1 / 23 / 456 / 7 8 9 10
141. Print the pattern: A / AB / ABC / ABCD / ABCDE
142. Print the pattern: 12345 / 1234 / 123 / 12 / 1
143. Print the pattern: 12345 / 2345 / 345 / 45 / 5
144. Print the pattern: 54321 / 4321 / 321 / 21 / 1
145. Print the pattern: 54321 / 5432 / 543 / 54 / 5
146. Print the pattern: ABCDE / BCDE / CDE / DE / E
147. Print the pattern: ***** / **** / *** / ** / *
148. Print the pattern: ********* / ******* / *** / ***** / *
149. Print the pattern: 1234567 / 12345 / 123 / 12 / 1
150. Print the pattern: 1 / 24 / 135 / 2468 / 13579
151. Print the pattern: 1 / 10 / 101 / 1010 / 10101
152. Print the pattern: 1 / 123 / 12345 / 1234567
153. Print the pattern: 1 / 234 / 56789
154. Print the pattern: 12345 / 1234 / 123 / 12
155. Print the pattern: *** / **** / ***** / 1 / ** / *
156. Print the pattern: ********* / ******* / ***** / *** / *
157. Print the pattern: ************* / ********* / ***** / *** / ***** / * / *** / ***** / *********** / *
158. Print the asterisk butterfly/hourglass pattern provided in the syllabus.
159. Print the asterisk inverted triangle pattern provided in the syllabus.
160. Print the asterisk hollow diamond pattern provided in the syllabus.
161. Print the asterisk criss-cross pattern provided in the syllabus.
162. Print the asterisk zigzag pattern provided in the syllabus.
163. Print the asterisk staggered pattern provided in the syllabus.
164. Print the asterisk scattered pattern provided in the syllabus.
165. Write a program for a given number to raise each digit to the power of its position (starting from 1) and find the sum. If the sum equals the original number, print Special Number else not.
166. Write a program for a number is given. Calculate the difference between the sum of even digits and odd digits. If the difference is zero, print Balanced Number else not.
167. Write a program to check whether the given number wins or loses. Rule: A number wins the game if it has exactly 6 factors.
168. Write a program for a number is given. Count how many of its digits are prime digits. If the count is greater than 2, print Prime-Rich Number else not.
169. Write a program to find the sum of squares of digits of a number. If the sum is a perfect square, print Square-Happy Number else not.
170. Write a program for a number is given, Reverse the number and check whether both the number and its reverse have the same number of factors or not.
171. Write a program for a given number, remove all digits divisible by 3 and form a new number. Print the newly formed number.
172. Write a program to calculate the sum of factorials of digits of a number. If the sum is divisible by 10, print Factorial-Lucky Number.
173. Write a program to swap the first and last digit of a number. If the new number is divisible by 11, print Swap Success.
174. Write a program to find and print which digits are missing from the number (contains digits from 0-9).
175. Write a program to print the sum of digits placed at prime positions (2nd, 3rd, 5th...) in a number.
176. Write a program for Multiply each digit by its position index and find the total sum. If the sum is even, print Weighted Even, else Weighted Odd.
177. Write a program for split a number into two halves and compare their digit sums. Print Equal Halves or Unequal Halves.
178. Write a program to find the difference between the largest and smallest digit of a number. If the difference is a perfect number, print Perfect-Gap Number.
179. Write a program for reverse a number and check whether reversed numbers and original numbers are prime or not. If yes, print Twisted Prime.
180. Write a Program that creates an array from a given list of integers.
181. Write a Program that accesses and prints the third element from an array.
182. Write a program that takes array of integers from user to find the sum of all elements in the array.
183. Write a program that takes array of integers from user to find the maximum & minimum of all elements in the array.
184. Write a program that takes array of integers from user to find all prime numbers in the array.
185. Write a program that takes array of decimal numbers from user to find mean of all elements in the array.
186. Write a program that takes array of characters from user to find all the vowels.
187. Write a program that takes array of input from user & print it in reverse order.
188. Write a program that takes marks obtained by student, assuming that the index of the array specifies the roll of the student and the value of an element denotes marks obtained by the student. Now find the total number of students who have secured 80 or more marks.
189. Write a program that takes marks obtained by student, assuming that the index of the array specifies the roll of the student and the value of an element denotes marks obtained by the student. Now print the roll numbers and marks of the student who have got less than 50.
190. Write a program to interchange largest and smallest number in an array.
191. Write a program to find second largest number in an array.
192. Write a program that takes n digits from user and print all possible combinations using them.
193. Write a program that takes array of integers from user to check whether it has a duplicate number.
194. Write a program that takes marks obtained by student between 0-100, assuming that the index of the array specifies the roll of the student and the value of an element denotes marks obtained by the student. Now make 10 groups: 0-10, 11-20, 21-30 etc. count the number of values that falls in each group and display the result.
195. Write a program to check whether a value exists in an array.
196. Write a program to insert a value in a given index of an array.
197. Write a program to delete an element in a given index from an array.
198. Write a program to delete a value from an array. If the value is not present in the array, it won't modify the existing array.
199. Write a program that takes n digits from user and arrange them in ascending order.
200. Write a program that takes n digits from user and arrange them in descending order.
201. Write a program to insert a number into an array that is already sorted in ascending order.
202. Write a program to merge two sorted arrays and print the final array in sorted order. The final array must not have any duplicate elements.
203. Write a program to merge two sorted arrays and display the merged array in reversed order.
204. Write a program that stores user input into an array and creates two arrays from the same for prime and non-prime numbers.
205. Write a program to remove duplicate elements from an array.
206. Write a program to count the frequency of each element in an array.
207. Write a program to check whether the array is sorted or not.
208. Write a program that takes n numbers from user between 1 to n and to print the missing numbers in the array.
209. Write a program that takes n numbers from user find the pair of elements whose sum is equal to a given value.
210. Write a program to find the intersection of two 1D arrays.
211. Write a program to find the union of two ID arrays.
212. Write a program to check if two arrays are equal (same elements in same order).
213. Write a program to find the element that appears more than n/3 times in an array.
214. Write a program to find all possible subarray with sum greater than a given value.
215. Write a program to find the smallest subarray with sum greater than a given value.
216. Write a program to split the array into equal-sum subarrays.
217. Write a program that takes n numbers from user and find the length of the longest subarray with all distinct elements.
218. Given a binary array, find the maximum length subarray containing equal number of Os and 1s.
219. Given a random array, find the maximum sum of elements such that no two chosen elements are adjacent.
220. Write a program that takes n numbers from user and determine the maximum length subarray with sum divisible by k.
221. Given an array representing daily temperatures, find how many days you must wait until a warmer temperature. Assuming warmer temperature is given by the user.
222. Write a program that takes n characters from user and sort them in alphabetical order.
223. Write a program to copy all elements from an array to another array.
224. Write a program for bubble sort.
225. Write a program for insertion sort.
226. Write a program for selection sort.
227. Write a program for merge sort.
228. Write a program for linear search.
229. Write a program for binary search.
230. Write a program to find "Kth" maximum and minimum element of an array.
231. Write a program to take 2 1D array from user and print the sum of them.
232. Write a program to create a 2D array(3x3) of numbers ranging from 1 to 9.
233. Write a program to create a 2D array(3x3) and extract the second column.
234. Write a program to create a 2D array(3x3) and extract the third row.
235. Write a program to find the Sum of each Row & Column of 3x3 array.
236. Write a program to insert perfect squares into a ID array from a 5x5 array.
237. Write a program to find the largest & smallest decimal number of 5x5 array.
238. Write a program to find if a 5x5 matrix is symmetric or not.
239. Write a program to add two 3x3 matrix and store it in a third 3x3 matrix.
240. Write a program to take X and Y co-ordinate of 10 different points, and calculate the farthest distance between two points.
241. Write a program to read marks of 5 subjects for a class with 10students, display the marks obtained by each student in different subject along with total marks.
242. Using the above problem, write a program to find the roll number of the student who got highest mark in each subject. Assuming the index of the array specifies the roll of the student.
243. Using the above problem, calculate average marks for each student. Now make 10 groups: 0-10, 11-20, 21-30 etc. count the number of students that falls in each group and display the result.
244. Write a program to count the number of zero elements in a matrix.
245. Write a program to multiply two 3x3 matrix and store it in a third 3x3 matrix.
246. Write a program to multiply a 3x3 matrix with a 3x2 matrix and store the result in a third matrix.
247. Write a program to fill a square matrix with zero on diagonals, 1 on the upper right triangle and -1 on the lower left triangle.
248. Write a program to read and display a 2x2x2 array.
249. Write a program to convert a square matrix into an upper triangular matrix.
250. Write a program to convert a square matrix into a lower triangular matrix.
251. Write a program to convert a square matrix into a tridiagonal matrix.
252. Write a program which replaces all duplicate values from a square matrix using "0".
253. Write a program to arrange the values of each column in a square matrix in such a way that even numbers precede the odd number for even index column and odd number precede even numbers for odd index column.
254. Write a program to calculate mean of the elements of a two-dimensional array.
255. Write a program to calculate the product of the elements that are present on the diagonal above the main diagonal.
256. Write a program for scalar multiplication of matrix.
257. Write a program to find inverse of a matrix.
258. Write a program to find determinant of a matrix.
259. Write a program for matrix rotation by 90 degrees clockwise and anticlockwise.
260. Write a program to check whether a matrix is an identity matrix.
261. Write a program to print sum of diagonals of a square matrix.
262. Write a program to search a value K in a square matrix.
263. Write a program to find the row with the maximum sum in a matrix.
264. Write a program to sort each row of a matrix in ascending order.
265. Write a program to implement sparse matrix.
266. Write a program to print the matrix in spiral order.
267. Write a program to find the maximum sum submatrix in a given matrix.
268. Write a program to count the number of islands (connected components of 1s) in a binary matrix.
269. Write a program to find the size of the largest square submatrix with all 1s.
270. Write a program to check whether a given matrix is a magic square.
271. Write a program to find the shortest path from the top-left to bottom-right cell in a matrix with obstacles. Assuming it is a binary matrix where 1 denote obstacle and 0 denote free cell.
272. Write a program to find the maximum sum path from top-left to bottom-right in a matrix.
273. Write a program to count all square submatrices with sum equal to a given value.
274. Write a program to find the size of the largest square submatrix with sum divisible by k.
275. Write a program to find the length of a string without using built-in functions.
276. Write a program to reverse a string.
277. Write a program to check whether a string is a palindrome.
278. Write a program to count the number of vowels in a string.
279. Write a program to count the number of consonants in a string.
280. Write a program to count digits in a string.
281. Write a program to count special characters in a string.
282. Write a program to count the number of words in a string.
283. Write a program to convert a string to uppercase.
284. Write a program to convert a string to lowercase.
285. Write a program to toggle the case of each character in a string.
286. Write a program to remove all spaces from a string.
287. Write a program to find the frequency of each character in a string.
288. Write a program to identify duplicate characters in a string.
289. Write a program to remove duplicate characters from a string.
290. Write a program to replace all vowels in a string with a given character.
291. Write a program to find the first non-repeating character in a string.
292. Write a program to find the last non-repeating character in a string.
293. Write a program to check whether two strings are anagrams.
294. Write a program to compare two strings without using built-in functions.
295. Write a program to concatenate two strings without using built-in functions.
296. Write a program to find the longest word in a string.
297. Write a program to find the shortest word in a string.
298. Write a program to reverse each word in a string.
299. Write a program to reverse the order of words in a string.
300. Write a program to remove a given character from a string.
301. Write a program to check whether a string contains only alphabets.
302. Write a program to check whether a string contains only digits.
303. Write a program to find the index of the first occurrence of a character.
304. Write a program to find the index of the last occurrence of a character.
305. Write a program to count the occurrence of a specific character in a string.
306. Write a program to check whether a string starts with a given substring.
307. Write a program to check whether a string ends with a given substring.
308. Write a program to check whether a substring exists in a string.
309. Write a program to find all occurrences of a substring in a string.
310. Write a program to remove punctuation marks from a string.
311. Write a program to capitalize the first letter of each word in a string.
312. Write a program to convert a string into title case.
313. Write a program to swap two strings without using a temporary variable.
314. Write a program to check whether a string is a pangram.
315. Write a program to check whether a string is a valid identifier.
316. Write a program to remove extra spaces from a string.
317. Write a program to find the maximum occurring character in a string.
318. Write a program to find the minimum occurring character in a string.
319. Write a program to count uppercase and lowercase letters separately.
320. Write a program to extract digits from a string.
321. Write a program to extract alphabets from a string.
322. Write a program to validate an email format using basic rules.
323. Write a program to validate a mobile number using length and digit rules.
324. Write a program to sort characters of a string alphabetically.
325. Write a program to sort words in a string lexicographically.
326. Write a program to remove all non-alphabetic characters from a string.
327. Write a program to remove all non-numeric characters from a string.
328. Write a program to find the longest palindromic substring.
329. Write a program to count palindromic substrings in a string.
330. Write a program to compress a string using character frequency.
331. Write a program to decompress a compressed string.
332. Write a program to check whether two strings are rotations of each other.
333. Write a program to find the longest common prefix of multiple strings.
334. Write a program to find the longest common substring between two strings.
335. Write a program to check whether a string follows a given pattern.
336. Write a program to replace a substring with another substring.
337. Write a program to remove all occurrences of a substring from a string.
338. Write a program to split a string into characters, words, and lines.
339. Write a program to check palindrome ignoring spaces and case.
340. Write a program to count the number of sentences in a string.
341. Write a program to count punctuation marks in a string.
342. Write a program to rotate a string left by k positions.
343. Write a program to rotate a string right by k positions.
344. Write a program to check whether a string has balanced parentheses.
345. Write a program to find the longest repeating substring.
346. Write a program to generate all permutations of a string.
347. Write a program to check whether a string is an isogram.
348. Write a program to check whether a string has all unique characters.
349. Write a program to replace spaces with a given character.
350. Write a program to find the length of a string using pointer.
351. Write a program to sort the characters of a string.
352. Write a program to validate a URL using basic string rules.
353. Write a program to count how many times a word appears in a string.
354. Write a program to find the most frequent word in a string.
355. Write a program to remove newline characters from a string.
356. Write a program to justify text to a given width.
357. Write a program to wrap text after a fixed number of characters.
358. Write a program to convert a numeric string into an integer.
359. Write a program to check whether a string represents a valid number.
360. Write a program to compute the edit distance between two strings.
361. Write a program to generate all substrings of a string.
362. Write a program to find the lexicographically smallest rotation of a string.
363. Write a program to reverse a string using recursion.
364. Write a program to detect repeated patterns in a string.
365. Write a program to replace multiple spaces with a single space.
366. Write a program to remove HTML/XML-like tags from a string.
367. Write a program to validate a password based on given rules.
368. Write a program to count the different types of characters' in given string.
369. Write a program to sort the characters of a string.
370. Write a program to convert a sentence into camelCase.
371. Write a program to convert a sentence into snake case.
372. Write a program to convert a sentence into kebab-case.
373. Write a program to find the longest substring without repeating characters.
374. Write a program to determine whether a string can be rearranged to form a palindrome.
375. Write a function to add two integers and return the result.
376. Write a function to find the square of a number.
377. Write a function to calculate the factorial of a number.
378. Write a function to find the minimum of three numbers.
379. Write a function to calculate the sum of digits of a number.
380. Write a function to reverse a number.
381. Write a function to check whether a number is a palindrome.
382. Write a function to check whether a number is prime.
383. Write a function to generate the Fibonacci series up to N terms.
384. Write a function to calculate power of a number using recursion.
385. Write a recursive function to find factorial of a number.
386. Write a function to count digits in a number.
387. Write a function to swap two numbers using function call.
388. Write a function to calculate sum of first N natural numbers.
389. Write a function to check Armstrong number.
390. Write a function to calculate GCD of two numbers.
391. Write a function to calculate LCM of two numbers.
392. Write a function to find sum of elements of an array.
393. Write a function to find largest & smallest element in an array.
394. Write a function to sort an array in ascending order using bubble sort.
395. Write a function to sort an array in descending order using selection sort.
396. Write a function to implement linear search.
397. Write a function to implement binary search.
398. Write a function to implement binary search using recursion.
399. Write a function to copy one array to another.
400. Write a function to merge two arrays.
401. Write a function to count vowel and consonants in a string.
402. Write a function to check whether a matrix is sparse or not.
403. Write a function to find sum of diagonal elements of a matrix.
404. Write a function to add two matrices.
405. Write a function to subtract two matrices.
406. Write a function to multiply two matrices.
407. Write a recursive function to find Fibonacci series.
408. Write a function to convert lowercase to uppercase.
409. Write a function to arrange 5 words of different length.
410. Write a function to find the binary equivalent of a positive number using recursion.
411. Write a function to print topper name among 10 students based on their total marks (use array of structure).
412. Write a function to compute the distance between two points and use it to develop another function that will compute the area of the triangle whose vertices are A(x1,y1), B(x2,y2), and C(x3,y3). Use these functions to develop a function which returns a value 1 if the point (x, y) lines inside the triangle ABC, otherwise a value 0.
413. Given three variables x, y, z write a function to circularly shift their values to right. In other words if x=5, y=8, z=10 after circular shift y=5, z=8, x=10 after circular shift y=5, z=8 and x=10 Call the function with variables a, b, c to circularly shift values.
414. Write a function to compute the greatest common divisor given by Euclid's algorithm, exemplified for J=1980 K=1617 as follows: 1980/1617=1, 1980-1*1617=363, 1617/363=4, 1617-4*363=165, 363/165=2, 363-2*165=33, 5/33=5, 165-5*33=0 Thus, the greatest common divisor is 33.
415. Write a function to find the norm of a matrix. The norm is defined as the square root of the sum of squares of all elements in the matrix.
416. Given an array p[5], write a function to shift it circularly left by two positions. Thus, if p[0]=15, p[1]=30, p[2]=28, p[3]=19 and p[4]=61 then after the shift p[0]=28, p[1] =19, p[2]=61, p[3]=15 and p[4]=30 Call this function for a (4x5) matrix and get its rows left shifted.
417. A 6x6 matrix is entered through the keyboard and stored in a 2-dimensional array mat[7][7]. Write a program to obtain the Determinant values of this matrix.
418. For the following set of sample data, compute the standard deviation and the mean. -6, -12, 8, 13, 11, 6, 7, 2, -6, -9, -10, 11, 10, 9, 2.
419. Write a program that uses an array of pointers to strings str[ ]. Receive two strings strl and str2 and check if strl is embedded in any of the strings in str[]. If strl is found, then replace it with str2.
420. char *str[] = { "We will teach you how to...", "Move a mountain", "Level a building", "Erase the past", "Make a million", "...all through C!" }; For example if str1 contains "mountain" and str2 contains "car", then the second string in str should get changed to "Move a car".
421. Write a program to reverse the strings stored in the following array of pointers to strings: char *s[] = { "To err is human...", "But to really mess things up...", "One needs to know C!!" }
422. A factory has 3 division and stocks 4 categories of products. An inventory table is updated for each division and for each product as they are received. There are three independent suppliers of products to the factory: (a) Design a data format to represent each transaction. (b) Write a program to take a transaction and update the inventory. (c) If the cost per item is also given write a program to calculate the total inventory values. It should be a menu driven program. For each purpose a different function must be called.
423. Write a program to delete all vowels from a sentence. Assume that the sentence is not more than 80 characters long.
424. Write a program that compares two given dates. To store date use structure, say date that contains three members namely date, month and year. If the dates are equal, then display message as "Equal" otherwise "Unequal".
425. Write a program to declare and use a pointer variable.
426. Write a program to access value using pointer.
427. Write a program to swap two numbers using pointers.
428. Write a program to find sum of two numbers using pointers.
429. Write a program to find maximum of two numbers using pointers.
430. Write a program to find minimum of two numbers using pointers.
431. Write a program to add array elements using pointers.
432. Write a program to find largest element in array using pointers.
433. Write a program to find smallest element in array using pointers.
434. Write a program to reverse an array using pointers.
435. Write a program to copy array using pointers.
436. Write a program to count even and odd numbers using pointers.
437. Write a program to find length of string using pointers.
438. Write a program to reverse string using pointers.
439. Write a program to compare two strings using pointers.
440. Write a program to concatenate strings using pointers.
441. Write a program to count vowels in string using pointers.
442. Write a program to search character in string using pointers.
443. Write a program to print array using pointer arithmetic.
444. Write a program to calculate sum of matrix elements using pointers.
445. Write a program to demonstrate pointer to pointer.
446. Write a program to demonstrate null pointer.
447. Write a program to demonstrate void pointer.
448. Write a program to demonstrate wild pointer.
449. Write a program to swap two arrays using pointers.
450. Write a program to access 2D array using pointers.
451. Write a program to find sum of diagonal of matrix using pointers.
452. Write a program to sort array using pointers.
453. Write a program to find factorial using pointer and function.
454. Write a program to find Fibonacci series using pointers.
455. Write a program to count characters in string using pointer.
456. Write a program to remove duplicate elements using pointers.
457. Write a program to merge two arrays using pointers.
458. Write a program to find average of numbers using pointers.
459. Write a program to print string using pointer only.
460. Write a program to check palindrome string using pointers.
461. Write a program to demonstrate pointer increment and decrement.
462. Write a program to access structure members using pointers.
463. Write a program to use pointer as function argument.
464. Write a program to return pointer from function.
465. Write a program to find GCD using pointers.
466. Write a program to find LCM using pointers.
467. Write a program to dynamically allocate memory using malloc.
468. Write a program to allocate memory using calloc.
469. Write a program to reallocate memory using realloc.
470. Write a program to free dynamically allocated memory.
471. Write a program to demonstrate dangling pointer.
472. Write a program to count words using pointers.
473. Write a program to copy string using pointer.
474. Write a program to search an element using pointers.
475. Write a C program to implement a generic data container using structures and unions that can store int, float, or string values.
476. Write a program to demonstrate manual memory alignment control in structures using compiler directives (where supported).
477. Write a program to design a variant record system using union and enum to safely handle multiple data types.
478. Write a program to implement a doubly linked list using self-referential structures.
479. Write a program to serialize and deserialize a structure to and from a binary file.
480. Write a program to design a protocol message format using nested structures and unions.
481. Write a program to compare pass-by-value vs pass-by-reference behavior with structures and analyze performance impact.
482. Write a program to implement a structure-based stack using dynamic memory allocation.
483. Write a program to demonstrate bit-level data packing using structure bit-fields for embedded systems.
484. Write a program to build a record indexing system using structures for fast searching.
485. Student Database System: Design a structure to store student details and display toppers based on marks.
486. Employee Payroll System: A company stores employee details and calculates salary using structures and functions.
487. Book Store Management: Use structures to store book details and search a book by ISBN.
488. Hospital Patient Records: Design a structure to store patient details and display critical patients.
489. Railway Reservation System: Use structures to store passenger details and ticket information.
490. Mobile Phone Inventory: A shop stores phone details and sorts phones based on price.
491. Online Course Platform: Store course details using structures and display courses longer than a given duration.
492. Hotel Room Booking System: Design a structure-based program to manage room bookings.
493. Vehicle Registration System: Store vehicle details using structures and search vehicles by registration number.
494. Company Department Records: Use nested structures to represent departments and employees.
495. Sensor Data System: A sensor can send integer, float, or character data. Use union to store sensor readings.
496. Payment Method System: An application supports cash, card, and UPI payments. Use union to store payment details efficiently.
497. Exam Answer Storage: An exam system stores either MCQ answer or descriptive score. Use union to optimize memory.
498. Media File Metadata: A media player stores either audio or video metadata. Implement using union.
499. Employee Compensation Type: An employee can be salaried or hourly-based. Use union to store compensation details.
500. Write a program to write data into a file.
501. Write a program to read data from a file.
502. Write a program to append data to a file.
503. Write a program to copy contents of one file to another.
504. Write a program to count characters in a file.
505. Write a program to count words in a file.
506. Write a program to count lines in a file.
507. Write a program to read file using fgets().
508. Write a program to write file using fputs().
509. Write a program to read file using fscanf().
510. Write a program to write file using fprintf().
511. Write a program to store student records in file.
512. Write a program to read student records from file.
513. Write a program to search record in file.
514. Write a program to delete a record from file.
515. Write a program to update record in file.
516. Write a program to demonstrate file pointer.
517. Write a program to handle file errors.
518. Write a program to demonstrate binary file operations.
519. Student Record File System: Store student details in a file and retrieve them when required.
520. Employee Attendance Tracker: Write a program to store daily attendance records in a file.
521. Library Book Records: Store book issue and return details using file handling.
522. Bank Transaction History: Record deposit and withdrawal transactions in a file.
523. Exam Result Storage: Write student exam results to a file and display pass/fail statistics.
524. Login Credentials System: Store usernames and passwords securely in a file.`;

function buildAssignmentDatabase() {
    const lines = rawData.split('\n');
    const assignments = [];
    
    lines.forEach(line => {
        const match = line.match(/^(\d+)\.\s*(.*)/);
        if (match) {
            assignments.push({
                id: parseInt(match[1]),
                title: match[2],
                category: "c-programming"
            });
        }
    });
    
    return assignments;
}

window.C_ASSIGNMENTS = buildAssignmentDatabase();