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
          <li><input type="radio" name="question1" id="question1-answer2" value="answer2" /> <label for="question1-answer2">A patent protects an invention from being copied in return for publicly detailing it.</label></li>
          <li><input type="radio" name="question1" id="question1-answer3" value="answer3" /> <label for="question1-answer3">A patent is a license to use a particular technology.</label></li>
          <li><input type="radio" name="question1" id="question1-answer4" value="answer4" /> <label for="question1-answer4">A patent protects a new technology from being copied.</label></li>
        </ul>
        <p class="explanation"> <a href="http://www.uspto.gov/main/glossary/#patent">According
          to the U.S. Patent Office</a>, a patent is a right granted to an
          inventor “to exclude others from making, using, offering for sale, or selling the invention”
          for a limited time in exchange for publicly disclosing it.</p>
      </li>

      <li>
        <!-- Make this clearer -->
        <label for="question2">Suppose someone claims you infringed upon their patent (copied them). How much would it cost to challenge them in court?</label>
        <ul class="radio">
          <li><input type="radio" name="question2" id="question2-answer1" value="answer1" /> <label for="question2-answer1">$1,000</label></li>
          <li><input type="radio" name="question2" id="question2-answer2" value="answer2" /> <label for="question2-answer2">$50,000</label></li>
          <li><input type="radio" name="question2" id="question2-answer3" value="answer3" /> <label for="question2-answer3">$100,000</label></li>
          <li><input type="radio" name="question2" id="question2-answer4" value="answer4" /> <label for="question2-answer4">$500,000</label></li>
        </ul>
        <p class="explanation">See “The Private Costs of Patent Litigation” (2008), page 16. This figure only includes legal fees and not the cost of a settlement.</p>
      </li>

      <li>
        <label for="question3">Suppose someone claims you infringed upon their patent (copied them) and you <em>lose</em>. Which of these is a possible consequence?</label>
        <ul class="radio">
          <li><input type="radio" name="question3" id="question3-answer1" value="answer1" /> <label for="question3-answer1">Injunction—A ban on the sale of an infringing product.</label></li>
          <li><input type="radio" name="question3" id="question3-answer2" value="answer2" /> <label for="question3-answer2">License—Paying for the right to use a patent.</label></li>
          <li><input type="radio" name="question3" id="question3-answer3" value="answer3" /> <label for="question3-answer3">Rewrite—Change the product to not use the patent.</label></li>
          <li><input type="radio" name="question3" id="question3-answer4" value="answer4" /> <label for="question3-answer4">All of these are options.</label></li>
        </ul>
        <p class="explanation">Any of these are possibilities. For instance, when Apple sued HTC, HTC initially faced an injunction before rewriting the code on its phones to avoid the patent. Later, HTC and Apple agreed to a licensing deal.</p>
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
        <p class="explanation"><a href="http://arstechnica.com/tech-policy/2012/07/ntp-to-get-patent-cash-from-pretty-much-entire-cell-phone-industry/">ArsTechnica details the case of NTP</a>, who has sued multiple corporations claiming it owns the concept of “wireless email”. This patent makes no sense—it simply combines email, which has long existed, with wireless networks, which isn’t an invention, but rather a straightforward application of existing technology. Yet companies such as Apple and Google have decided to settle, implying that they believe they can’t fight off the patent at a reasonable cost.</p>
      </li>

      <li>
        <label for="question6">True or False: computer code is already automatically protected under copyrights.</label>
        <ul class="radio">
          <li><input type="radio" name="question6" id="question6-answer1" value="answer1" /> <label for="question6-answer1">True</label></li>
          <li><input type="radio" name="question6" id="question6-answer2" value="answer2" /> <label for="question6-answer2">False</label></li>
        </ul>
        <p class="explanation">True! Any code is automatically copyrighted, even if you don’t include a copyright statement. This already protects code from being directly copied.</p>
      </li>

      <li>
        <label for="question7">True or False: computer code that applies a mathematical algorithm can be patented.</label>
        <ul class="radio">
          <li><input type="radio" name="question7" id="question7-answer1" value="answer1" /> <label for="question7-answer1">True</label></li>
          <li><input type="radio" name="question7" id="question7-answer2" value="answer2" /> <label for="question7-answer2">False</label></li>
        </ul>
        <p class="explanation">Unfortunately, this is also true. An algorithm or formula isn’t patentable (imagine patenting $E=mc²$—would you then own the universe?), but applying it on a machine is because that is “novel”.</p>
      </li>

      <li>
        <label for="question8">Your iPhone/Nexus 5/other smartphone is covered by approximately how many patents?</label>
        <ul class="radio">
          <li><input type="radio" name="question8" id="question8-answer1" value="answer1" /> <label for="question8-answer1">1,000</label></li>
          <li><input type="radio" name="question8" id="question8-answer2" value="answer2" /> <label for="question8-answer2">25,000</label></li>
          <li><input type="radio" name="question8" id="question8-answer3" value="answer3" /> <label for="question8-answer3">100,000</label></li>
          <li><input type="radio" name="question8" id="question8-answer4" value="answer4" /> <label for="question8-answer4">250,000</label></li>
        </ul>
        <p class="explanation">That’s <em>16%</em> of all US patents going into letting you watch YouTube on the bus, <a href="http://google.brand.edgar-online.com/EFX_dll/EDGARpro.dll?FetchFilingHtmlSection1?SectionID=7667485-249020-298342&amp;SessionID=KBRPFWfPE63E1l7">according to RPX</a>, a “defensive patent aggregator”. (Source: <a href="http://www.project-disco.org/intellectual-property/one-in-six-active-u-s-patents-pertain-to-the-smartphone/">Disruptive Competition Project</a>)</p>
      </li>

      <li>
        <label for="question9">How much would it theoretically cost for a company to make sure a product doesn’t infringe upon any software patents? (infringe—copy, intentionally or not, an invention in a patent)</label>
        <ul class="radio">
          <li><input type="radio" name="question9" id="question9-answer1" value="answer1" /> <label for="question9-answer1">$400 million</label></li>
          <li><input type="radio" name="question9" id="question9-answer2" value="answer2" /> <label for="question9-answer2">$100 billion</label></li>
          <li><input type="radio" name="question9" id="question9-answer3" value="answer3" /> <label for="question9-answer3">$400 billion</label></li>
          <li><input type="radio" name="question9" id="question9-answer4" value="answer4" /> <label for="question9-answer4">$500 billion</label></li>
        </ul>

        <p class="explanation">See “Scaling the Patent System” (2012), pages
        14–15. Or in other words, a single single company paying lawyers to
        check each patent for 10 minutes would need to hire 2
        <em>million</em> full-time patent attorneys at $100 an hour.</p>

      </li>

      <li>
        <label for="question10">True or False: a hotel can be sued for patent infringement for setting up a Wi-Fi network.</label>
        <ul class="radio">
          <li><input type="radio" name="question10" id="question10-answer1" value="answer1" /> <label for="question10-answer1">True</label></li>
          <li><input type="radio" name="question10" id="question10-answer2" value="answer2" /> <label for="question10-answer2">False</label></li>
        </ul>

        <p class="explanation">Also <a href="http://arstechnica.com/tech-policy/2013/02/wi-fi-patent-troll-hit-with-novel-anti-racketeering-charges-emerges-unscathed/">from ArsTechnica</a>. A company named Innovatio IP Ventures targets coffee shops, hotels, and others using Wi-Fi, demanding between \$2,000 and \$5,000 from each, and says it could sue private households as well. Eventually <a href="http://arstechnica.com/tech-policy/2014/02/cisco-strikes-deal-to-pay-wi-fi-patent-troll-3-2-cents-per-router/">Cisco agreed to pay the company $2.7 million</a>, but then another company began to make claims using a different set of patents.</p>
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
