import React from "react"

import LayoutBase from "../components/LayoutBase"

const Title = ({ children }) => <div style={{ fontSize: `1.5em`, paddingBottom: `1em`, paddingTop: `1em` }}>{children}</div>
const RowHead = ({ children }) => <span style={{ fontWeight: `bold`, paddingRight:`0.2em`}}>{children}</span>
const RowVal= ({ children }) => <span>{children}</span>

export default () => (
  <LayoutBase>
    <Title>
      Contact
    </Title>
    <div><RowHead>Name</RowHead> <RowVal>Cedric Dumont</RowVal> </div>
    <div><RowHead>Live in</RowHead> <RowVal>Zagreb</RowVal> </div>
    <div><RowHead>Born</RowHead> <RowVal>21/10/1976</RowVal> </div>
    <div><RowHead>Place of Birth</RowHead> <RowVal>Belgium</RowVal> </div>
    <div>
    <RowHead>Links</RowHead> 
    <RowVal>
      <a href="https://github.com/CedricDumont" target="_blank" rel="noopener noreferrer">Github</a>&nbsp;&nbsp;-&nbsp;&nbsp;
        <a href="https://www.linkedin.com/in/cedric-dumont-2503552/" target="_blank" rel="noopener noreferrer">LinkedIn</a>&nbsp;&nbsp;-&nbsp;&nbsp;
        <a href="mailto:cedric.dumont@outlook.com" target="_top">cedric.dumont@outlook.com</a>
        </RowVal>
    </div>
    <Title>
      Languages
        </Title>
    <div><RowHead>French</RowHead> <RowVal>Native</RowVal> </div>
    <div><RowHead>English  </RowHead> <RowVal> Full professional proficiency   </RowVal> </div>
    <div><RowHead>Dutch  </RowHead> <RowVal> Limited working proficiency   </RowVal> </div>
    <div><RowHead>Croatian  </RowHead> <RowVal> Limited working proficiency   </RowVal> </div>


    <Title>
      Certifications (Most Recent First)(#certifications)
    </Title>

    <div><RowHead>Microsoft: </RowHead> <RowVal> [MCSD](https://www.microsoft.com/learning/fr-fr/mcsd-web-apps-certification.aspx): Web Applications (Msft Exam: 70-487, 70-486, 70-483)  </RowVal> </div>
    <div><RowHead>Microsoft: </RowHead> <RowVal>MCPS - MS : Programming in C#  </RowVal> </div>
    <div><RowHead>Sun Microsystems  :</RowHead> <RowVal>Java Certified Programmer 1.4  </RowVal> </div>
    <div><RowHead>Sun Microsystems  :</RowHead> <RowVal>Java Certified Web Component Developer 1.4  </RowVal> </div>

    <Title>
      Education
    </Title>

    <div><RowHead>1999 - 2002  :</RowHead> <RowVal>Université de Liège  :Bachelor of Business Administration (B.B.A.), Business, Management, Marketing, and Related Support  </RowVal> </div>
    <div><RowHead>1997 - 2001  :</RowHead> <RowVal>IEPSF  :Bachelor of Electronics, Electrical and Electronics Engineering  </RowVal> </div>
    <div><RowHead>1997 - 2000  :</RowHead> <RowVal>IEPSF  :Bachelor in accounting and the tax system, Accounting and Finance  </RowVal> </div>
    <div><RowHead>1993 - 1997  :</RowHead> <RowVal>Université de Liège  :Physiotherapy  </RowVal> </div>

    <Title>
      Experiences
       </Title>

    <div><RowHead>September 2008 - Present : </RowHead> <RowVal>Freelance  :IT Consultant : Software Architect for the J2EE platform and .NET Framework Customers : Atos SA  </RowVal> </div>
    <div><RowHead>September 2009 - Present : </RowHead> <RowVal>Athome Design SPRL  :CEO and Owner at Athome Design  </RowVal> </div>
    <div><RowHead>August 2002 - 2008 : </RowHead> <RowVal>Siemens  :Software Architect-Developer - Started as junior developer for the J2EE platform then software Architect for web based solution build on top of the J2EE Architecture and .net Framework. Area : European Parliament, Belgian Social Security, Public Sector  </RowVal> </div>

    <Title>
      Skills
      </Title>
    <div><RowHead>Expert  :</RowHead> <RowVal>.net 1.1-4.7, .net core, C#, Wcf, MVC , Web Api, Java 1.1-1.8, J2EE, Javascript (ES-5, ES-6, ES-*), typescript</RowVal> </div>
    <div><RowHead>Advanced  :</RowHead> <RowVal> AngularJS 1.X family Azure  </RowVal> </div>
    <div><RowHead>Required Knowledge  :</RowHead> <RowVal>Html5, Css, Xml, Rest and other Hypermedia stuff, Bootstrap and the like, Semantic Web Scrum and other Agile Development methodologies Visual Studio 2003 - 2015, Eclipse  </RowVal> </div>



  </LayoutBase>
)