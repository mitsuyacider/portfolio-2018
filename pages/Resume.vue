<template>
<div class="app-container">
  <!-- First Page -->
  <div class="resume-container" id="element-to-print">
    <div class="border-decoration"></div>

    <!-- Header for name/role/email..etc -->
    <section class="resume-header">
      <div class="header_body">
        <div class="header_body_inner-left">
          <div class="name">MITSUYA WATANABE</div>
          <div class="occupation">Software Engineer</div>
        </div>
        <div class="header_body_inner-right">
          <div><span>Email:</span> mitsuya.watanabe85@gmail.com</div>
          <div><span>Phone:</span> +49 162 7203111</div>
          <div>
            <span>Address:</span> Düsseldorf, Germany
          </div>
          <div><span>Portfolio:</span> <a href="https://mitsuyacider.com">https://mitsuyacider.com</a></div>
        </div>
      </div>
    </section><!-- /Header for name/role/email..etc -->

    <div class="main-container">
      <!-- Left container -->
      <div class="left-container">
        <!-- Summary -->
        <section class="resume-object">
          <div class="header">RESUME OBJECTIVE</div>
          <ul>
            <li>Senior software engineer with over 8 years of proven experience.</li>
            <!-- <li>Proficient in Web and Mobile Frontend development</li> -->
            <li>Extensive expertise for a large-scale Web application and video streaming service development with aware of overload.</li>
            <li>Development experience with a team in over 30 persons using version control such as Git and Redmine.</li>
          </ul>
        </section>

        <section class="resume-career">
          <div class="header">EXPERIENCE</div>
          <div class="career">
            <div class="role">Web Developer</div>
            <div class="firm"><span class="firm_name">Papyrus GmbH</span> / May 2019 - Present</div>
            <ul>
              <li>Improved page load speed by 20% with average score 90 by Audits and successfully reduced file size by 10% by removing render-blocking JavaScript, reducing critical rendering paths, loading images lazily and optimizing css.</li>
              <li>Engaged in the development of the top page renewal of a large-scale video distribution service for daily users of 10,000 people. Responsible for all coding on the front side, implemented with full scratching using functional programming.</li>
              <li>Introduced Vue.js architecture as an authoring tool, increased development efficiency by 10% in cooperation with designers.</li>
              <li>By implementing a non-third-party function based on the concept of Flux, managed statuses on pages to keep and share them between pages.</li>
              <li>Engaged in education for new employees of junior developer.</li>
            </ul>  
          </div>
  
          <div class="career">
            <div class="role">Web Developer / Mobile Application Developer / Director</div>
            <div class="firm"><span class="firm_name">GOCCO., inc.</span> / Apr 2012 - Apr 2019</div>
            <ul>
              <li>Developed a real-time video shooting system for large shopping malls as a web application. Used by more than 100 users. Use ffmpeg with Node.js for video processing.</li>
              <li>In charge of direction and development of an application for the Japan Pavilion at the Expo held in Astana.</li>
              <li>Accomplished the first prototype of patent pending system called LIT System that detects patterns in the demo application written with C++ and Objective-C while controlling hardware by Arduino to ignite lights for a particular duration.</li>
            </ul>  
          </div>
          
          <div class="career">
            <div class="role">Lecturer</div>
            <div class="firm"><span class="firm_name">Nagoya Bunri University</span> / Sep 2015 - Mar 2018</div>
            <ul>
              <li>4 years of visual programming education using OpenProcessing.</li>
              <li>Created an original lesson curriculum and give more than 20 students lectures from the basics of JavaScript to the basics of object-oriented.</li>
            </ul>  
          </div>
          
          <!-- <div class="career">
            <div class="role">CO-FOUNDER / PROPRIETOR</div>
            <div class="firm"><span class="firm_name">PassGate inc.</span> / Aug 2016 - Present</div>
            <ul>
              <li></li>
              <li></li>
            </ul>  
          </div>             -->
        </section>
        
        <!-- <section class="resume-education">
          <div class="header">EDUCATION</div>
  
          <div class="education_body">
            <div class="education">
              <div class="education_field">MA, MEDIA STUDIES</div>
              <div class="education_school">Institute of Advanced Media Arts and Sciences (IAMAS)</div>
              <div class="education_period">Gifu, Japan / 2012</div>
            </div>
  
            <div class="education">
              <div class="education_field">BA(HONS), MIXED MEDIA STUDIES</div>
              <div class="education_school">Nagoya Zoukei University of Art & Design</div>
              <div class="education_period">Nagoya, Japan / 2009</div>
            </div>
          </div>
        </section>           -->
      </div><!-- /Left container -->

      <div class="right-container">
        <!-- resume-skills -->
        <section class="resume-skills">
          <div class="header">SKILLS <small class="expert">Expert</small> <small class="advanced">Advanced</small> <small class="intermediate">Intermediate</small></div>
          
          <div class="skill-title">Coding</div>
          <div class="skill-container">
            <!-- WEB -->
            <div class="skill-item expert">HTML</div>
            <div class="skill-item expert">CSS</div>
            <div class="skill-item expert">SASS</div>
            <div class="skill-item expert">JavaScript</div>
            <div class="skill-item expert">ECMAScript</div>
            <div class="skill-item expert">Smarty</div>
            <div class="skill-item advanced">pjax</div>
            <div class="skill-item advanced">Node.js</div>
            <div class="skill-item intermediate">WebGL</div>
            <div class="skill-item intermediate">Three.js</div>
            <div class="skill-item expert">Vue</div>
            <div class="skill-item intermediate">Bootstrap</div>
            <div class="skill-item intermediate">React</div>
            <div class="skill-item expert">Webpack</div>
            <div class="skill-item expert">Gulp</div>
            <div class="skill-item expert">Git</div>
            <div class="skill-item advanced">Firebase</div>
            <div class="skill-item intermediate">TensorFlow</div>
            <div class="skill-item intermediate">C++</div>
            <div class="skill-item advanced">Objective-C</div>
            <div class="skill-item advanced">Swift(iOS)</div>
            <div class="skill-item intermediate">Unity</div>
            <div class="skill-item expert">Processing</div>
          </div>

          <div class="skill-title">Design</div>
          <div class="skill-container">
            <!-- iOS -->
            <div class="skill-item advanced">Illustrator</div>
            <div class="skill-item advanced">Photoshop</div>
            <div class="skill-item advanced">Sketch</div>
            <div class="skill-item intermediate">Zeplin</div>
            <div class="skill-item intermediate">Abstract</div>
          </div>

          <div class="skill-title">Project Management Tool</div>
          <div class="skill-container">
            <!-- iOS -->
            <div class="skill-item expert">Redmine</div>
          </div>

          <!-- Language -->
          <div class="skill-title">Languages</div>
          <div class="skill-container">
            <div class="skill-item expert">Japanese(native)</div>
            <div class="skill-item advanced">English</div>          
            <div class="skill-item intermediate">German</div>          
          </div>

        </section> <!-- /resume-skills -->

        <section class="resume-education">
          <div class="header">EDUCATION</div>
  
          <div class="education_body">
            <div class="education">
              <div class="education_field">MA, MEDIA STUDIES</div>
              <div class="education_school">Institute of Advanced Media Arts and Sciences</div>
              <div class="education_period">Gifu, Japan / 2012</div>
            </div>
  
            <div class="education">
              <div class="education_field">BA(HONS), MIXED MEDIA STUDIES</div>
              <div class="education_school">Nagoya Zoukei University of Art & Design</div>
              <div class="education_period">Nagoya, Japan / 2009</div>
            </div>
          </div>
        </section>

          <!-- Language -->
        <!-- <section>
          <div class="header">Languages</div>

          <div class="skill-container">
            <div class="skill-item expert">Japanese(native)</div>
            <div class="skill-item advanced">English</div>          
            <div class="skill-item intermediate">German</div>          
          </div>            
        </section> -->
              
        <section class="resume-awards">
          <div class="header">AWARDS</div>
  
          <div class="awards_body">
            <div class="awards">
              <div class="awards_title">Japan Media Arts Festival</div>
              <div class="awards_category">Jury Selections</div>            
              <div class="awards_role">role: visual effects / GOCCO. / 2015</div>
            </div>            
  
            <div class="awards">
              <div class="awards_title">Visible light communication system</div>
              <div class="awards_category">Patent pending</div>
              <div class="awards_role">role: development / GOCCO. / 2015</div>
            </div>
  
            <div class="awards">
              <div class="awards_title">Magnetic communication system</div>
              <div class="awards_category">Patent pending</div>
              <div class="awards_role">role: development / GOCCO. / 2016</div>
            </div>
          </div>          
        </section>  
      </div>

    </div>
    <div class="border-decoration bottom">
      <a href="">https://mitsuyacider.com/resume</a>
    </div>
  </div> <!-- /First Page -->
</div>

</template>

<style lang="scss" scoped>
$body-color: gray;
$border-color: #0c0f14;
$gray-color: #f0f0f0;
$underline-color: #0c0f14;
$expert-color : rgb(1, 5, 15);
$advanced-color : rgb(110, 133, 201);
$intermediate-color : rgb(161, 179, 233);
$bg-skill: rgb(224, 234, 250);
$key-color: gray;
$base-color: gray;

$normal-font-size: 0.55em;
$section-font-size: 1.35em;
$career-role-font-size: 1.2em;
$firm-font-size: 1.2em;
$header-name-font-size: 2.5em;
$header-occupation-font-size:1.8em;
$width: 595px * 0.9;
$height: 842px * 0.9;
$skill-header-color-size: 0.6em;
$skill-item-size: 0.8em;

.app-container {
  color: $body-color;
  margin: 0;
  font-size: $normal-font-size;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  font-family:sans-serif;

}

a {
  color: $base-color;
  text-decoration: none;
}

ul {
  margin-top: 4px;
  >li {
    // line-height: 1.3em;
    margin-bottom: 3px;
  }
}

section {
  padding: 0 20px;
  margin-top: 20px;
  color: $base-color;
}

.career:not(:first-child) {
  border-bottom: 1px solid $gray-color;
}

.career {
  margin: 10px 0;
  // border-bottom: 1px solid black;

  .role {
    color: black;
    font-size: $career-role-font-size;
    font-weight: bold;
  }
  .firm {
    font-style: oblique;
    font-size: $firm-font-size;
    color: $base-color;

    &_name {
      color: $key-color;
    }
  }  
}

.resume-container {
  width: $width;
  height: $height;
  max-height: $height;
  border: 1px solid lightgray;
  position: relative;
    -webkit-box-sizing: border-box;
  box-sizing: border-box;

}

.border-decoration {
  width: 100%;
  background: $border-color;
  height: 10px;
  border: none;
}

.border-decoration.bottom {
  position: absolute;
  bottom: 0;
  text-align: right;
  
  >a {
    margin-right: 5px;
    color: white;
    opacity: 0.6;
  }
}

.main-container {
  display: flex;
  width: 100%;

  .left-container {
    width: 60%;
  }

  .right-container {
    width: 40%;
  }
}

section {
  >.header {
    color: black;
    // margin-top: 10px;
    font-size: $section-font-size;
    border-bottom: 2px solid $underline-color;
    font-weight: bold;
  }
}

// NOTE: ヘッダー。メールアドレスや電話番号など
section.resume-header {  
  margin-top: 0px;
  background: $gray-color;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  .header_body {
    // background: red;
    display: flex;
    justify-content: space-between;
    width: 100%;

    &_inner-left {
      .occupation {
        margin-top: 5px;
        font-size: $header-occupation-font-size;
        color: $key-color;
      }

      .name {
        color: black;
        font-size: $header-name-font-size;
        font-weight: bold;
      }  
    }

    &_inner-right {
      span {
        color: black;
      }

      text-align: right;
      width: 200px;
    }
  }
}

section.resume-skills {
  small {
    font-size: $skill-header-color-size;
    font-weight: lighter;
  }

  // .expert {color: #B53D63;}
  .expert {color:$expert-color;}
  .advanced {color: $advanced-color;}
  .intermediate {color: $intermediate-color}

  .skill-title {
    margin-top: 8px;
  }
  .skill-container {
    display: flex;
    // margin-top: 5px;
    flex-wrap: wrap;

    .skill-item {
      padding: 4px 8px;
      background: $bg-skill;
      border-radius: 2px;
      margin-right: 6px;
      margin-top: 5px;
      font-size: $skill-item-size;
    }

  }
}

section.resume-education {
  .education_body {
    // display: flex;
    margin-top: 5px;
    // justify-content:space-around;
  }

  .education {
    margin-bottom: 8px;
    &_field {
      color: black;
      font-weight: bold;
    }

    &_school {
      color: black;
    }

    &_period {
      font-style: oblique;     
    }
  }
}

section.resume-awards {
  .awards_body {
    // display: flex;
    margin-top: 5px;
    // justify-content:space-around;
  }

  .awards {
    margin-bottom: 8px;
    &_title {
      color: black;
      font-weight: bold;
    }

    &_category {
      color: black;
    }

    &_role {
      font-style: oblique;     
    }
  }
}


/* 
  ##Device = Low Resolution Tablets, Mobiles (Landscape)
  ##Screen = B/w 481px to 767px
*/
@media (min-width: 768px) and (max-width: 1024px) {
}

/* 
  ##Device = Most of the Smartphones Mobiles (Portrait)
  ##Screen = B/w 320px to 479px
*/
@media (min-width: 320px) and (max-width: 480px) {
  $normal-font-size: 0.5em;
  $section-font-size: 1.35em;
  $career-role-font-size: 1.2em;
  $firm-font-size: 1.2em;
  $header-name-font-size: 1.8em;
  $header-occupation-font-size:1.8em;
  $skill-header-color-size: 0.6em;
  $skill-item-size: 0.8em;
  
  
  .app-container {
    display: block;
    width: 100%;
  }

  .main-container {
    display: block;
    width: 100%;

      .left-container {
        width: 100%;
      }

      .right-container {
        width: 100%;
      }
    }  

    .resume-container {
      width: 100%;
      height: auto;
      max-height: 200vh;
    }  

    // NOTE: ヘッダー。メールアドレスや電話番号など
    section.resume-header {  
      width: 100%;
      height: 60px;

      .header_body {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &_inner-left {
          .occupation {
            font-size: $header-occupation-font-size;
          }

          .name {
            line-height: 1em;
            margin-top: 5px;
            font-size: $header-name-font-size;
          }  
        }

        &_inner-right {
          width: 180px;
        }
      }
    }  
}
</style>