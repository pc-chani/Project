//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class GMH
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public GMH()
        {
            this.PRODUCTtoGMHs = new HashSet<PRODUCTtoGMH>();
        }
    
        public int GmhCode { get; set; }
        public string GmhName { get; set; }
        public string Adress { get; set; }
        public int UserCode { get; set; }
        public int CategoryCode { get; set; }
        public string Phone { get; set; }
        public string e_mail { get; set; }
        public string commits { get; set; }
    
        public virtual CategoryGMH CategoryGMH { get; set; }
        public virtual USER USER { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PRODUCTtoGMH> PRODUCTtoGMHs { get; set; }
    }
}