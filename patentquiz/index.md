---
layout: base
title: Software Patent Quiz
---

<div class="col-md-8">
  <p>How much do you know about software patents?</p>

  <form onsubmit="return checkQuiz();">
    <ol>
      <li>
        <label for="question1">What is a patent?</label>
        <ul class="radio">
          <li><input type="radio" name="question1" id="question1-answer1" value="answer1" /> <label for="question1-answer1">A patent protects an idea that you have so others can’t copy it.</label></li>
          <li><input type="radio" name="question1" id="question1-answer2" value="answer2" /> <label for="question1-answer2">A patent protects an invention from being copied in return for publicly disclosing it.</label></li>
          <li><input type="radio" name="question1" id="question1-answer3" value="answer3" /> <label for="question1-answer3">A patent</label></li>
          <li><input type="radio" name="question1" id="question1-answer4" value="answer4" /> <label for="question1-answer4">Test</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>

      <li>
        <!-- Make this clearer -->
        <label for="question2">Suppose someone claims you infringed upon their patent (copied them). How much would it cost to challenge their claim?</label>
        <ul class="radio">
          <li><input type="radio" name="question2" id="question2-answer1" value="answer1" /> <label for="question2-answer1">$1,000</label></li>
          <li><input type="radio" name="question2" id="question2-answer2" value="answer2" /> <label for="question2-answer2">$50,000</label></li>
          <li><input type="radio" name="question2" id="question2-answer3" value="answer3" /> <label for="question2-answer3">$100,000</label></li>
          <li><input type="radio" name="question2" id="question2-answer4" value="answer4" /> <label for="question2-answer4">$500,000</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>

      <li>
        <label for="question3">Suppose someone claims you infringed upon their patent (copied them) and you <em>lose</em>. Which of these is a possible consequence?</label>
        <ul class="radio">
          <li><input type="radio" name="question3" id="question3-answer1" value="answer1" /> <label for="question3-answer1">Injunction—A ban on the sale of an infringing product.</label></li>
          <li><input type="radio" name="question3" id="question3-answer2" value="answer2" /> <label for="question3-answer2">License—Paying for the right to use a patent.</label></li>
          <li><input type="radio" name="question3" id="question3-answer3" value="answer3" /> <label for="question3-answer3">Rewrite—Change the product to not use the patent.</label></li>
          <li><input type="radio" name="question3" id="question3-answer4" value="answer4" /> <label for="question3-answer4">All of these are options.</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>

      <li>
        <label for="question4">Which of these companies has faced lawsuits over patents about online shopping carts?</label>
        <ul class="radio">
          <li><input type="radio" name="question4" id="question4-answer1" value="answer1" /> <label for="question4-answer1">Amazon</label></li>
          <li><input type="radio" name="question4" id="question4-answer2" value="answer2" /> <label for="question4-answer2">Newegg</label></li>
          <li><input type="radio" name="question4" id="question4-answer3" value="answer3" /> <label for="question4-answer3">RadioShack</label></li>
          <li><input type="radio" name="question4" id="question4-answer4" value="answer4" /> <label for="question4-answer4">All of them</label></li>
        </ul>
        <p class="explanation"><a href="http://arstechnica.com/tech-policy/2013/01/how-newegg-crushed-the-shopping-cart-patent-and-saved-online-retail/">ArsTechnica describes the entire series of court cases</a>, including Newegg’s decision to fight the patent. Companies from Home Depot to J.C. Penney to Walgreens were sued, with some companies ordered to pay millions before Newegg managed to successfully get the patent invalidated.</p>
      </li>

      <li>
        <label for="question5">Which of these companies faced a lawsuit over a patent on “wireless email”?</label>
        <ul class="radio">
          <li><input type="radio" name="question5" id="question5-answer1" value="answer1" /> <label for="question5-answer1">BlackBerry (Research in Motion)</label></li>
          <li><input type="radio" name="question5" id="question5-answer2" value="answer2" /> <label for="question5-answer2">Apple</label></li>
          <li><input type="radio" name="question5" id="question5-answer3" value="answer3" /> <label for="question5-answer3">Google</label></li>
          <li><input type="radio" name="question5" id="question5-answer4" value="answer4" /> <label for="question5-answer4">All of them</label></li>
        </ul>
        <p class="explanation">http://arstechnica.com/tech-policy/2012/07/ntp-to-get-patent-cash-from-pretty-much-entire-cell-phone-industry/</p>
      </li>

      <li>
        <label for="question6">True or False: computer code is already automatically protected under copyrights.</label>
        <ul class="radio">
          <li><input type="radio" name="question6" id="question6-answer1" value="answer1" /> <label for="question6-answer1">True</label></li>
          <li><input type="radio" name="question6" id="question6-answer2" value="answer2" /> <label for="question6-answer2">False</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>

      <li>
        <label for="question7">True or False: computer code that applies a mathematical algorithm can be patented.</label>
        <ul class="radio">
          <li><input type="radio" name="question7" id="question7-answer1" value="answer1" /> <label for="question7-answer1">True</label></li>
          <li><input type="radio" name="question7" id="question7-answer2" value="answer2" /> <label for="question7-answer2">False</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>

      <li>
        <label for="question8">Your iPhone/Nexus 5/other smartphone is covered by approximately how many patents?</label>
        <ul class="radio">
          <li><input type="radio" name="question8" id="question8-answer1" value="answer1" /> <label for="question8-answer1">1,000</label></li>
          <li><input type="radio" name="question8" id="question8-answer2" value="answer2" /> <label for="question8-answer2">25,000</label></li>
          <li><input type="radio" name="question8" id="question8-answer3" value="answer3" /> <label for="question8-answer3">100,000</label></li>
          <li><input type="radio" name="question8" id="question8-answer4" value="answer4" /> <label for="question8-answer4">250,000</label></li>
        </ul>
        <p class="explanation">That’s <em>16%</em> of all US patents going into letting you watch YouTube on the bus.</p>
      </li>

      <li>
        <label for="question9">How much would it theoretically cost for a company to make sure it doesn’t infringe upon any software patents? (infringe—copy, intentionally or not, an invention in a patent)</label>
        <ul class="radio">
          <li><input type="radio" name="question9" id="question9-answer1" value="answer1" /> <label for="question9-answer1">Test</label></li>
          <li><input type="radio" name="question9" id="question9-answer2" value="answer2" /> <label for="question9-answer2">$1.5 trillion (10% of US GDP)</label></li>
          <li><input type="radio" name="question9" id="question9-answer3" value="answer3" /> <label for="question9-answer3">Test</label></li>
          <li><input type="radio" name="question9" id="question9-answer4" value="answer4" /> <label for="question9-answer4">Test</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>

      <li>
        <label for="question10">True or False: a hotel can be sued for patent infringement for setting up a Wi-Fi network.</label>
        <ul class="radio">
          <li><input type="radio" name="question10" id="question10-answer1" value="answer1" /> <label for="question10-answer1">True</label></li>
          <li><input type="radio" name="question10" id="question10-answer2" value="answer2" /> <label for="question10-answer2">False</label></li>
        </ul>
        <p class="explanation">This is a test explanation.</p>
      </li>
    </ol>
    <button id="submit-quiz">See Results</button>
  </form>

  <p>
    Note: I am collecting results from this survey. No personal information is
    collected, only your answers.
  </p>

  <p><a href="/patents">Learn More about Software Patents</a></p>
  <script src="/quiz.js"> </script>
</div>
